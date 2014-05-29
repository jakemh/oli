class CreateComponents < ActiveRecord::Migration
  def change
    create_table :components do |t|
      t.integer :activity_id
      t.string :type
      t.text :content

      t.timestamps
    end
  end
end
