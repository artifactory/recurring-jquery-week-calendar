class CreateStateTimezonesList < ActiveRecord::Migration
  def self.up
    timezones = { :ALASKA => [ "Alaska" ],
                  :ARIZONA => [ "Arizona" ],
                  :CENTRAL => [ "North Dakota", "Minnesota", "Wisconsin", "South Dakota", "Iowa", "Illinois", "Nebraska", "Missouri", "Kansas", "Tennessee", "Alabama", "Mississippi", "Louisiana", "Arkansas", "Oklahoma", "Texas" ],
                  :EASTERN => [ "South Carolina", "Rhode Island", "Pennsylvania", "Ohio", "North Carolina", "New York", "New Jersey", "New Hampshire", "Michigan", "Massachusetts", "Maryland", "Maine", "Kentucky", "Georgia", "Florida", "Delaware", "Connecticut", "District of Columbia", "West Virginia", "Virginia", "Vermont" ],
                  :HAWAII => [ "Hawaii" ],
                  :INDIANA => [ "Indiana" ],
                  :MOUNTAIN => [ "Idaho", "Montana", "Wyoming", "Colorado", "Utah", "New Mexico" ],
                  :PACIFIC => [ "Washington", "Oregon", "Nevada", "California" ]
    }

    timezones.each do | zone, states |
      states.each do | state |
        execute "INSERT INTO lists(active, sequence, list, name, value) VALUES (true, 0, 'state_timezones', ( select l.value from lists l where l.list = 'state_ids' and l.name='#{state}' ), '#{zone.to_s}')"
      end
    end
  end

  def self.down
    execute "DELETE FROM lists WHERE list = 'state_timezones'"
  end
end
