class AvailabilityBlock < ActiveRecord::Base

=begin
  AvailabilityBlock represents a block of a user's time availability. It is the app/db corresponding
  data element to the tc_scheduler.js' calEvent. An AvailabilityBlock (ab) holds the start, end, and type
  data for a user's availability to be displayed in tc_scheduler.

  The calendar in RB-4.n is a single week display, i.e., Dateless; only Time is of import.
  For this initial release, which is a single week representation of a Doc's schedule, tc_scheduler has
  been forced into an arbitrary Month/Day/Year (which arbitrarily is the week beginning Sunday Jan 2, 2000),
  with only the Time of day being considered.

  tc_scheduler posts block times in this string format:
    DAY MONth [day of month] YEAR hour:minute:second GMT-[offset] (timezone abbrev),
    e.g. "Mon Jan 03 2000 18:00:00 GMT-0500 (EST)". Again, in this example, "Jan 03 2000",
    while stored, is irrelevant to the initial one-week/Dateless calendar.

  Timezones: all times are stored in the DB in UTC. On initial dataload, tc_scheduler registers the
  browser's local timezone (fetched via the javascript getTimezoneOffset() method) with the
  AvailabilityBlocksController :reset_timezone method; the timezone is stored as an hour-granular
  UTC offset, with US times being relatively negative.
  Subsequently, the user may at any time during the session reset the tc_scheduler timezone via the
  tc_timezone_selector dropdown, which will repopulate (via a calendar reload) the tc_scheduler with
  correspondingly offset hours. Subsequent to this reset, all POSTs and PUTs are converted from the
  registered timezone to UTC before saving in the DB store.
  On fetch, which happens (a) at initial load and (b) at timezone_reset, the ab times are converted from UTC into the
  registered timezone for display by tc_scheduler. Thus the scheduler's events are always in sync with the session's
  registered timezone, without the tc_scheduler needing to know what timezone it is in.
=end

  belongs_to :user

  def self.update_availability
    tc_users = user.find(:all)
    tc_users.each {|d|
      d.update_attribute( :in_out, ( ( ret = self.avail_now(d) ) != 0 ))
      d.update_attribute( :video_session_enabled, (ret == 2) ) # avail_now returns 2 if phone and video
      d.save
    }
    "Processed #{tc_users.size} tc users."
  end

  # does this doc have a current (Time.now) availability block?
  # if so, is it:
  #   phone only => return 1
  #   phone and video => return 2
  #   neither => return 0
  def self.avail_now (user)
    now = Time.now
    timezone_offset = Time.now.utc_offset/(60*60) # this method runs as a cron on the server, so it doesn't care what the session[:availability_block_utc_offset] var is.
    # TODO: apply offset
    day = now.wday
    slot = block_time_slot(now)
    # p "now #{now}, day #{day}, slot:#{slot}"
    user.availability_blocks.find(:all, :order => 'start').each{|b|
      # p "#{b.id}: day:#{b.start.wday} - start:#{b.start} slot: slot:#{block_time_slot(b.start)}; end:#{b.end} slot: slot:#{block_time_slot(b.end)};"
      @avail = 0
      if day == b.start.wday
        if slot >= block_time_slot(b.start) && slot < block_time_slot(b.end)
          @avail = 1 + ( ( b.appointment_type == 'phone_and_video' ) ? 1 : 0 )  # return 2 if both, 1 if phone only
          break   # found it, we're done
        end
      elsif day < b.start.wday
        break   # we've passed the specified day in the sorted user array without finding it, so we're done
      end
    }
    # p @avail.to_s
    @avail
  end

  def self.reset_timezone(offset)
    session[:availability_block_utc_offset] = offset
  end


  def self.gmt_from_sched_str(time_str)
    time_str[/.*GMT-([0-9]*)/,1]
  end

  private

  # break the 24-hour day into 30 minute slots;
  # return the slot for the passed-in Time instance
  def self.block_time_slot(t)
    slot = t.hour*2 + (t.min >= 30 ? 1 : 0)
  end





end
