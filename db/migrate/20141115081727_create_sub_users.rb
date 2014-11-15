class CreateSubUsers < ActiveRecord::Migration
  def change
    create_table :sub_users do |t|
      t.string :name
      t.string :email

      t.timestamps
    end
  end
end
