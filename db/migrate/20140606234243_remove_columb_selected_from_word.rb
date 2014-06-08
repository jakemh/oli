class RemoveColumbSelectedFromWord < ActiveRecord::Migration
  def change
    remove_column :words, :selected, :boolean
  end
end
