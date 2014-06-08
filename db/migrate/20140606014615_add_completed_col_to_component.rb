class AddCompletedColToComponent < ActiveRecord::Migration
  def change
    add_column :components, :is_completed, :boolean
  end
end
