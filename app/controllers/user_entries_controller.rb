class UserEntriesController < ApplicationController
  def list
    render :json => UserEntry.find(params[:ids]), root: "entries"
  end

  def update
  end

  def create
    permit = params[:entry].permit(:post, :component, :context)
    UserEntry.create!(:user => current_user, :component_id => permit[:component], :post => permit[:post], :context => permit[:context])
    render :json => nil
  end
end
