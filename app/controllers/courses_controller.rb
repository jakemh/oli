class CoursesController < ApplicationController
  # before_action :authenticate_user!
  # check_authorization
  def index
    puts "CURRENT USER: ", current_user
    @courses = Course.all

  end
  def list
    render :json => Course.find(params[:ids])
  end


  def get
    @course = Course.find(params[:id])
    render json: @course
    # @course = Course.find(params[:id])
    # @topics = @course.topics.pluck(:id)
    # render json: {"course" => {:name => @course.name, :id => @course.id, :topics => @topics}}
  end

  def show
    @course = Course.find(params[:id])
    @topic = @course.topics.first
    @activities = @topic.sections.first.activities || []
    p "ACTIVITIES: ", @activities
    render json: @course

    # respond_to do |format|
    #   format.html
    #   format.json do    
    #     render json: [@course, @topic, @activities]
    #   end
    # end
  end
  
end
