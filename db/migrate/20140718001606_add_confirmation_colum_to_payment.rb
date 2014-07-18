class AddConfirmationColumToPayment < ActiveRecord::Migration
  def change
    add_column :payments, :confirmation, :string
  end
end
