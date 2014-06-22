class AddBoxIdToActivityDependency < ActiveRecord::Migration
  def change
    add_column :activity_dependencies, :box_id, :integer
  end
end
