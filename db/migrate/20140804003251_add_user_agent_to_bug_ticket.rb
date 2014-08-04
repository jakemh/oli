class AddUserAgentToBugTicket < ActiveRecord::Migration
  def change
    add_column :bug_tickets, :user_agent, :text
  end
end
