class AddComponentColumnToWord < ActiveRecord::Migration
  def change
    add_column :words, :word_selection_id, :integer
  end
end
