class ComponentsController < ApplicationController
  def list
    render :json => Component.find(params[:ids])
  end

  def update
    puts "PARAMS: ", params
   Component.find(params[:id]).update_attributes(params[:component].permit(:user_content))
   render :json => nil
  end
end
