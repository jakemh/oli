class UsersController < ApplicationController
  before_action :authenticate_user!
  skip_authorization_check
  
  def index

  end

  def show
    @user = current_user    
  end
end
