class AddTypeColumnToUserEntry < ActiveRecord::Migration
  def change
    add_column :user_entries, :type, :string
  end
end
