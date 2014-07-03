class AddActiveColumnToUserEntry < ActiveRecord::Migration
  def change
    add_column :user_entries, :is_active, :boolean
  end
end
