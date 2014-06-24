class AddDisplayColumnToActivity < ActiveRecord::Migration
  def change
    add_column :activities, :display, :boolean
  end
end
