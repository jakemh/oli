class CreateWordBoxes < ActiveRecord::Migration
  def change
    create_table :boxes do |t|
      t.integer :component_id
      t.timestamps
    end
  end
end
