class AddWordableIdColumnToWord < ActiveRecord::Migration
  def change
    add_column :words, :wordable_id, :integer
  end
end
