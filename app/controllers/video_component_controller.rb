class VideoComponentController < ApplicationController
  def list
    render :json => VideoComponent.find(params[:ids]), :key => "videoComponents"
  end

  def show
    render :json => VideoComponent.find(params[:id]), :key => "videoComponent"
  end

  def update
   VideoComponent.find(params[:id]).update_attributes(params[:component].permit(:user_content))
   render :json => nil
  end
end
