class RemoveAmountColFromPayment < ActiveRecord::Migration
  def change
    remove_column :payments, :amount, :integer
  end
end
