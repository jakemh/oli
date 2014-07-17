class BoxEntriesController < ApplicationController
  def list
    # render :json => current_user.box_entries.find(params[:ids]), root: "actionEntries"
  end

  def update
  end

  def create
    permit = params[:boxEntry].permit(:actionEntry, :box_id)
    # entry = ActionEntry.create!(:component_id => permit[:component], :post => permit[:post], :context => permit[:context])
    action_entry = current_user.action_entries.where(:id => permit[:actionEntry]).first
    # boxables = action_entry.boxables.where(:box_id => permit[:boxes])
    boxable = current_user.boxables.where(:box_id => permit[:box_id]).first
    # action_entry.boxable_entries.destroy_all
    action_entry.boxable_entries << BoxableEntry.create(:boxable => boxable)

    render :json => nil
  end
end
