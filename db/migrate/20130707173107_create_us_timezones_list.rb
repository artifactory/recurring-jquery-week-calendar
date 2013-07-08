class CreateUsTimezonesList < ActiveRecord::Migration
  def self.up
  create_table  :lists, :primary_key => :id do |t|
    t.boolean :active
    t.integer :sequence
    t.string  :list
    t.string  :value
    t.string :name
  end

    execute "INSERT INTO lists (active, sequence, list, value, name) VALUES (true, 7, 'us_timezones', 'America/Puerto_Rico', 'America/Puerto_Rico (AST)')"
    execute "INSERT INTO lists (active, sequence, list, value, name) VALUES (true, 5, 'us_timezones', 'America/New_York', 'America/Puerto_Rico (EDT)')"
    execute "INSERT INTO lists (active, sequence, list, value, name) VALUES (true, 2, 'us_timezones', 'America/Chicago', 'America/Chicago (CDT)')"
    execute "INSERT INTO lists (active, sequence, list, value, name) VALUES (true, 1, 'us_timezones', 'America/Boise', 'America/Boise (MDT)')"
    execute "INSERT INTO lists (active, sequence, list, value, name) VALUES (true, 6, 'us_timezones', 'America/Phoenix', 'America/Phoenix (MST)')"
    execute "INSERT INTO lists (active, sequence, list, value, name) VALUES (true, 4, 'us_timezones', 'America/Los_Angeles', 'America/Los_Angeles (PDT)')"
    execute "INSERT INTO lists (active, sequence, list, value, name) VALUES (true, 3, 'us_timezones', 'America/Juneau', 'America/Juneau (AKDT)')"
    execute "INSERT INTO lists (active, sequence, list, value, name) VALUES (true, 9, 'us_timezones', 'Pacific/Honolulu', 'Pacific/Honolulu (HST)')"
    execute "INSERT INTO lists (active, sequence, list, value, name) VALUES (true, 8, 'us_timezones', 'Pacific/Guam', 'Pacific/Guam (ChST)')"
    execute "INSERT INTO lists (active, sequence, list, value, name) VALUES (true, 10, 'us_timezones', 'Pacific/Samoa', 'Pacific/Samoa (SST)')"
    execute "INSERT INTO lists (active, sequence, list, value, name) VALUES (true, 11, 'us_timezones', 'Pacific/Wake', 'Pacific/Wake (WAKT)')"
  end

  def self.down
    execute "DELETE FROM lists WHERE list='us_timezones'"
  end
end
