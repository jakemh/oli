class AddTemplateColumnToActivity < ActiveRecord::Migration
  def change
    add_column :activities, :template, :string
  end
end
