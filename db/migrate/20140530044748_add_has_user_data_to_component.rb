class AddHasUserDataToComponent < ActiveRecord::Migration
  def change
    add_column :components, :user_data, :boolean
  end
end
