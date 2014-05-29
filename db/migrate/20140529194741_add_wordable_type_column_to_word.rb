class AddWordableTypeColumnToWord < ActiveRecord::Migration
  def change
    add_column :words, :wordable_type, :string
  end
end
