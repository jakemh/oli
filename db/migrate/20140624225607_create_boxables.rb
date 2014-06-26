class CreateBoxables < ActiveRecord::Migration
  def change
    create_table :boxables do |t|
      t.string :user_id
      t.string :integer
      t.integer :box_id
      t.integer :word_id

      t.timestamps
    end
  end
end
