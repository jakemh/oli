class RemoveActivityColumnFromWord < ActiveRecord::Migration
  def change
    remove_column :words, :activity_id, :integer
  end
end
