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

  def update
    @user = current_user 
    permit = params[:user].permit(:role, :name, :photo)
    puts "TEST: ", permit
    @user.update_attributes(:name => permit[:name])

    # permit = params[:user].permit(:role)
    # puts permit
    @user.roles << Role.create(:name => permit[:role])

    render json: @user
  end
end
