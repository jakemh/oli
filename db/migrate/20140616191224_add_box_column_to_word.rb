class AddBoxColumnToWord < ActiveRecord::Migration
  def change
    add_column :words, :box_id, :integer
  end
end
