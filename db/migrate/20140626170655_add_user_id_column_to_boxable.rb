class AddUserIdColumnToBoxable < ActiveRecord::Migration
  def change
    add_column :boxables, :user_id, :integer
  end
end
