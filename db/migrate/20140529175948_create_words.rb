class CreateWords < ActiveRecord::Migration
  def change
    create_table :words do |t|
      t.string :word
      t.integer :activity_id
      t.integer :user_id

      t.timestamps
    end
  end
end
