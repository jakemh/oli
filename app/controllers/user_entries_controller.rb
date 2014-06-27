class UserEntriesController < ApplicationController
  def list
    render :json => current_user.user_entries.find(params[:ids]), root: "entries"
  end

  def update
  end

  def create
    permit = params[:entry].permit(:post, :component, :context)
    current_user.user_entries << UserEntry.create!(:component_id => permit[:component], :post => permit[:post], :context => permit[:context])
    render :json => nil
  end
end
