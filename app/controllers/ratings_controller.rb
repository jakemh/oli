class RatingsController < ApplicationController
  def list
    render :json => Rating.find_for_user(params[:ids], current_user)
  end

  def show
    # render :json => Rating.find(params[:id])
  end

  def new
    permit = params[:rating].permit(:value, :box, :context)
    new_rating = Rating.create!(
      :user => current_user,
      :value => permit[:value],
      :box_id => permit[:box],
      :context => permit[:context]

      )
    render :json => new_rating 
  end
end
