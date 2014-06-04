class AddSelectedColumnToWord < ActiveRecord::Migration
  def change
    add_column :words, :selected, :boolean
  end
end
