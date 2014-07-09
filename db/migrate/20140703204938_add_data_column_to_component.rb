class AddDataColumnToComponent < ActiveRecord::Migration
  def change
    add_column :components, :data, :string
  end
end
