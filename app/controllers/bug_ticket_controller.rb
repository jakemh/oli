class BugTicketController < ApplicationController
  def create
    permit = params.require(:bug).permit(:description, :url)
    current_user.bug_tickets.build(permit).save
  end
end
