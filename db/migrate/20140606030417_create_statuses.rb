class CreateStatuses < ActiveRecord::Migration
  def change
    create_table :statuses do |t|
      t.integer :activity_id
      t.integer :user_id
      t.boolean :completed

      t.timestamps
    end
  end
end
