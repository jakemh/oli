class RemoveColumnsFromComponent < ActiveRecord::Migration
  def change
    remove_column :components, :user_data, :boolean
    remove_column :components, :user_content, :text
    remove_column :components, :master_id, :integer
    remove_column :components, :user_id, :integer

  end
end
