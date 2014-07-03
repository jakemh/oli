class CreateBoxableEntries < ActiveRecord::Migration
  def change
    create_table :boxable_entries do |t|
      t.integer :boxable_id
      t.integer :action_entry_id

      t.timestamps
    end
  end
end
