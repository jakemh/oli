class ComponentsController < ApplicationController
  def list
    render :json => Component.find(params[:ids])
  end

end
