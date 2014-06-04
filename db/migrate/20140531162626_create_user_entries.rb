class CreateUserEntries < ActiveRecord::Migration
  def change
    create_table :user_entries do |t|
      t.integer :component_id
      t.integer :user_id
      t.text :post
      t.string :content_type

      t.timestamps
    end
  end
end
