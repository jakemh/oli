class AddContextColumnToUserCalendarEntry < ActiveRecord::Migration
  def change
    add_column :user_calendar_entries, :context, :string
  end
end
