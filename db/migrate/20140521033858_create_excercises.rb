class CreateExcercises < ActiveRecord::Migration
  def change
    create_table :excercises do |t|
      t.integer :activity_id
      t.string :name

      t.timestamps
    end
  end
end
