class AddContextColToComponent < ActiveRecord::Migration
  def change
    add_column :components, :context, :string
  end
end
