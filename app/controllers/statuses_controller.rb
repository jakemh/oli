class StatusesController < ApplicationController
  def update
    Status.find(params[:id]).update_attributes(params[:status].permit(:completed))
    render :json => nil
  end
end
