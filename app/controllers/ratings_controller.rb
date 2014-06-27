class RatingsController < ApplicationController
  def list
    render :json => current_user.ratings.find(params[:ids])
  end

  def show
    # render :json => Rating.find(params[:id])
  end

  def new
    permit = params[:rating].permit(:value, :box, :context)
    new_rating = Rating.create!(
      :value => permit[:value],
      :box_id => permit[:box],
      :context => permit[:context]
      )

    current_user.ratings << new_rating
    render :json => new_rating 
  end
end
