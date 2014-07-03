class UsersController < ApplicationController
  before_action :authenticate_user!
  skip_authorization_check
  
  def user
    @user = current_user 
    render json: [@user], :key => :users  
  end
  
  def show
    @user = current_user 
    render json: @user  
  end
end
