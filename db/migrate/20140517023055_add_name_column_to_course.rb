class AddNameColumnToCourse < ActiveRecord::Migration
  def change
    add_column :courses, :name, :string
  end
end
