class RemoveContentTypeFromUserEntry < ActiveRecord::Migration
  def change
    remove_column :user_entries, :content_type, :string
  end
end
