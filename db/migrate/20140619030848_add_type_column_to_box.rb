class AddTypeColumnToBox < ActiveRecord::Migration
  def change
    add_column :boxes, :type, :string
  end
end
