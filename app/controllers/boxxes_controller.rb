class BoxxesController < ApplicationController
  def list
    render :json => Boxx.find(params[:ids])
  end

  def show
    render :json => Boxx.find(params[:id])
  end

  def new
  end
end
