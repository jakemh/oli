class AddColumnsToPayment < ActiveRecord::Migration
  def change
    add_column :payments, :purchasable_id, :integer
    add_column :payments, :purchasable_type, :string
  end
end
