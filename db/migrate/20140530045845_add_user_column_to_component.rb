class AddUserColumnToComponent < ActiveRecord::Migration
  def change
    add_column :components, :user_id, :integer
  end
end
