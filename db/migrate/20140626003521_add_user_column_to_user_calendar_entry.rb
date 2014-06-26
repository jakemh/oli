class AddUserColumnToUserCalendarEntry < ActiveRecord::Migration
  def change
    add_column :user_calendar_entries, :user_id, :integer
  end
end
