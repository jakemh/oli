class BugTicketController < ApplicationController
  def create
    permit = params.require(:bug).permit(:description, :url, :userAgent)
    current_user.bug_tickets.build(Hash[permit.map {|k, v| [k.underscore, v] }]).save
  end
end
