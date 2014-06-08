class ActivityController < ApplicationController
  
  def list
    render :json => Activity.find(params[:ids])
  end

  def update

  end
end
