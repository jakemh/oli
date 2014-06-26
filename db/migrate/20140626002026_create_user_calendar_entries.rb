class CreateUserCalendarEntries < ActiveRecord::Migration
  def change
    create_table :user_calendar_entries do |t|
      t.date :date
      t.text :entry
      t.boolean :active
      t.boolean :added_to_calendar

      t.timestamps
    end
  end
end
