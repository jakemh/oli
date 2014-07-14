class RemoveDataColumnFromComponent < ActiveRecord::Migration
  def change
    remove_column :components, :data, :string
  end
end
