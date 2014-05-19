class CoursesController < ApplicationController
  # before_action :authenticate_user!
  # check_authorization
  def index
    puts "CURRENT USER: ", current_user
    @courses = Course.all.pluck(:name)

  end

  def show
      @course = Course.find(params[:id])
      @topic = @course.topics.first
      render 'show'
  end
  
end
