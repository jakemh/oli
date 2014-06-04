class AddMasterColumnToComponent < ActiveRecord::Migration
  def change
    add_column :components, :master_id, :integer
  end
end
