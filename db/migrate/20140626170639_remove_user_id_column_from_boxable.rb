class RemoveUserIdColumnFromBoxable < ActiveRecord::Migration
  def change
    remove_column :boxables, :user_id, :string
  end
end
