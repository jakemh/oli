class CreateSignUps < ActiveRecord::Migration
  def change
    create_table :sign_ups do |t|
      t.integer :user_id
      t.integer :course_id

      t.timestamps
    end
  end
end
