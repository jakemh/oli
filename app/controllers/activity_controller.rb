class ActivityController < ApplicationController
  
  def list
    if params[:ids]
      render :json => Activity.find(params[:ids])
    elsif params[:template]
      render :json => Activity.where(:template => params[:template])
    end
  end

  def update

  end
end
