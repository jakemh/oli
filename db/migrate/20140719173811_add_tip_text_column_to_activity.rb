class AddTipTextColumnToActivity < ActiveRecord::Migration
  def change
    add_column :activities, :tip, :text
  end
end
