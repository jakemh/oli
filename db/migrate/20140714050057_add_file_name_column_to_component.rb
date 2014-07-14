class AddFileNameColumnToComponent < ActiveRecord::Migration
  def change
    add_column :components, :file_name, :string
  end
end
