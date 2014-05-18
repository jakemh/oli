class CoursesController < ApplicationController
  before_action :authenticate_user!

  def index
    puts "CURRENT USER: ", current_user
    @courses = Course.all.pluck(:name)
  end

  def show
    if current_user.courses.include? params[:id]

    else
      flash[:alert] = "You are not signed up yet!"
      redirect_to my_page_path
    end
  end

end
