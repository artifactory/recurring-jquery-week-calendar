class CreateUsers < ActiveRecord::Migration
  create_table  :users, :primary_key => :id do |t|
    t.integer     :id
    t.string :name
  end
  User.new({:name => "Joe User"}).save

end
