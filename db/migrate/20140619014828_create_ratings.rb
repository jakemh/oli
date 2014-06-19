class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :box_id
      t.integer :value
      t.string :context

      t.timestamps
    end
  end
end
