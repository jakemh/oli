class AddAllColumnToWord < ActiveRecord::Migration
  def change
    add_column :words, :all_users, :boolean
  end
end
