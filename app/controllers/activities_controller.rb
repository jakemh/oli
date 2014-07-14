class ActivitiesController < ApplicationController
 

  def list
    render :json => Activity.find(params[:ids])
  end

  def update
    save_params = params[:activity].permit(:completed)
    Activity.find(params[:id]).update_completed(save_params[:completed], current_user)
    render :json => nil
  end
end
