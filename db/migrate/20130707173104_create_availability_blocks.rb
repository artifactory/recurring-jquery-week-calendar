class CreateAvailabilityBlocks < ActiveRecord::Migration
  def self.up
    create_table  :availability_blocks, :primary_key => :id do |t|
      t.integer     :id
      t.integer     :user_id
      t.datetime    :start
      t.datetime    :end
      t.string      :appointment_type
    end
  end
end
