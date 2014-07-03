class ActionEntriesController < ApplicationController
  def list
    render :json => current_user.action_entries.find(params[:ids]), root: "actionEntries"
  end

  def update
  end

  def show
    render :json => current_user.action_entries.find(params[:id]), root: "actionEntry"
  end


  def create
    permit = params[:actionEntry].permit(:post, :component, :context, :boxes)
    entry = ActionEntry.create!(:component_id => permit[:component], :post => permit[:post], :context => permit[:context])
    current_user.action_entries << entry

    if permit[:boxes]
      current_user.boxable_entries.destroy_all
      boxables = current_user.boxables.where(:box => permit[:boxes])
      # entry.boxable_entries << boxables
      boxables.each do |boxable|
        entry.boxable_entries << Boxable.create!(:boxable => boxable)
      end
    end
    render :json => nil
  end
end
