class CreateSelections < ActiveRecord::Migration
  def change
    create_table :selections do |t|
      t.integer :word_id
      t.integer :user_id
      t.boolean :status

      t.timestamps
    end
  end
end
