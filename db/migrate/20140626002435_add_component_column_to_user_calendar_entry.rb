class AddComponentColumnToUserCalendarEntry < ActiveRecord::Migration
  def change
    add_column :user_calendar_entries, :component_id, :integer
  end
end
