class AddUserContantToComponent < ActiveRecord::Migration
  def change
    add_column :components, :user_content, :text
  end
end
