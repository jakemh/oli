class ActivityController < ApplicationController
  
  def list
    render :json => Activity.where(params[:ids])
  end

end
