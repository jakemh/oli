class AddCompletedColumnToActivity < ActiveRecord::Migration
  def change
    add_column :activities, :completed, :boolean
  end
end
