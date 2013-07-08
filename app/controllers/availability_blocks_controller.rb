class AvailabilityBlocksController < ApplicationController

=begin
An AvailabilityBlock (ab) holds the start, end, and type info for a user's availability to be displayed
in tc_scheduler.

The calendar in RB-4.n is a single week display, i.e., dateless; only time is of import.
Since Jquery.weekcalendar was altered for this purpose (forcing everything to the arbitrary week of Jan 2, 2000),
it is not a major job to unalter the one-week restriction and thus make tc_scheduler a date-based calendar.

Timezones: all times are stored in the DB in UTC. On initial dataload, tc_scheduler registers the browser's local timezone
with this controller's reset_timezone method; the timezone is stored as an hour-granular utc offset, with US times being negative.
Subsequently, the user may at any time during the session reset the tc_scheduler timezone via the tc_timezone_selector dropdown,
which will repopulate (via a page reload)the tc_scheduler with correspondingly offset hours. Subsequently, all POSTs and PUTs
are converted from the registered timezone to UTC before saving in the DB store.
On fetch, which happens (a) at initial load and (b) at timezone_reset, the ab times are converted from UTC into the
registered timezone for display by tc_scheduler. Thus the scheduler's events are always in syc with the session's
registered timezone, without the tc_scheduler needing to know what timezone it is in.


=end

  skip_before_filter :authenticate, :verify_authenticity_token


  def index
    debugger
    if (@user_id = session[:user_id]).nil?
      # debugger
      flash[:error] = "AvailabilityBlock: User not initialized."
      redirect_to :controller => 'user', :action => 'login' and return
    else
      # debugger
      if session[:ab_utc_offset].nil? then  session[:ab_utc_offset] = 0 end
      abs = AvailabilityBlock.find_all_by_user_id(@user_id)
      abslist = Array.new
      abs.each {|a| abslist << prep(a)}

      respond_to do |format|
        format.html { render :text => abslist}
        format.xml { render :xml => abslist }
        format.json {render :json => abslist}
      end
    end
  end

  def create
    debugger
    ab = AvailabilityBlock.new(
      :start => incoming_to_utc(params[:start].to_datetime),
      :end => incoming_to_utc(params[:end].to_datetime),
      :appointment_type => params[:appointment_type],
      :user_id => session[:user_id]
    )
    ret = ab.save
    respond_to do |format|
      format.html { render :text => ret ? ab.to_json : "NAK"}
      format.xml { render :xml => ret ? ab : "NAK"}
      format.json {render :json => ab}
    end
  end

  def update
    # debugger
    ab = AvailabilityBlock.find(params[:id]) if params[:id]
    if ab.nil?
      flash[:error] = "AvailabilityBlock update: id nil or #{params[:id]} not found."
      render :text => "Error: id not found"
    else
      ab.start = incoming_to_utc(params[:start].to_datetime)
      ab.end = incoming_to_utc(params[:end].to_datetime)
      ab.appointment_type = params[:appointment_type]
      ab.save
      # ret = prep(ab)
      ret = ab
      respond_to do |format|
        format.html { render :text => ret}
        format.xml { render :xml => ret}
        format.json {render :json => ret}
      end
    end
  end


  def destroy
    # debugger
    ab = AvailabilityBlock.find(params[:id])
    if ab.nil?
      flash[:error] = "AvailabilityBlock destroy: id #{params[:id]} not found."
      render :text => "Error: id not found"
    else
      ab.delete
      respond_to do |format|
        format.html { render :text => "OK"}
        format.xml { render :xml => "OK"}
        format.json {render :json => ab}
      end
    end

  end

  def reset_timezone
    debugger
    # set to new TimeZone
    ret = {}
    offset = params[:offset].nil? ? 0 :  params[:offset].to_i     # an initial empty call sets the timezone to UTC
    session[:ab_utc_offset] = offset
    # return the timezone name
    ActiveSupport::TimeZone.us_zones.each {|z| if z.utc_offset == offset*(60*60) then ret[:zone_name] = z.name; ret[:zone_offset] = offset; break; end }

    render :json => ret.empty? ? {:zone_name => 'unmatched'} : ret
  end


  private

  def prep(a) # basically, we are prepping the date for conversion to javascript Date.
  {
    :id => a.id,
    :user_id => a.user_id,
    :start => timezone_adjust(a.start).to_i,
    :end => timezone_adjust(a.end).to_i,
    :appointment_type => a.appointment_type
  }
  end

  def timezone_adjust(tdate)
    tdate + session[:ab_utc_offset].hours
  end

  def incoming_to_utc(tdate)
    tdate  - session[:ab_utc_offset].hours
  end
end
