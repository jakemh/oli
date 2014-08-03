class CreateBugTickets < ActiveRecord::Migration
  def change
    create_table :bug_tickets do |t|
      t.text :description
      t.text :error
      t.integer :user_id
      t.string :url

      t.timestamps
    end
  end
end
