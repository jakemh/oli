class UserEntriesController < ApplicationController
  def list
    # render :json => current_user.user_entries.find(params[:ids]), root: "entries"
    if params[:ids]
      render :json => current_user.user_entries.find(params[:ids]), root: "entries"
    else
      params.delete("controller"); params.delete("action")
      render :json => current_user.user_entries.where(params), root: "entries"
    end
  end

  def show
    render :json => current_user.user_entries.find(params[:id]), root: "entry"
  end

  def update
  end

  def create
    permit = params[:entry].permit(:post, :component, :context)
    current_user.user_entries << UserEntry.create!(:component_id => permit[:component], :post => permit[:post], :context => permit[:context])
    render :json => current_user.user_entries.last, root: "entry"
  end
end
