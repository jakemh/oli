class RemoveTipColumnFromActivity < ActiveRecord::Migration
  def change
    remove_column :activities, :tip, :string
  end
end
