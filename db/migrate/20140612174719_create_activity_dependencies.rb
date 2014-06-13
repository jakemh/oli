class CreateActivityDependencies < ActiveRecord::Migration
  def change
    create_table :activity_dependencies do |t|
      t.integer :activity_id
      t.integer :dependent_activity_id

      t.timestamps
    end
  end
end
