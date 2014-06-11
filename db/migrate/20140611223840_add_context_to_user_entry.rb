class AddContextToUserEntry < ActiveRecord::Migration
  def change
    add_column :user_entries, :context, :string
  end
end
