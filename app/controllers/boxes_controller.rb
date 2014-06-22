class BoxesController < ApplicationController
  def list
    render :json => Box.find(params[:ids])
  end

  def show
    render :json => Box.find(params[:id])
  end

  def new
  end
end
