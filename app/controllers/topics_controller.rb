class TopicsController < CoursesController

  def show
    @topic = @course.topics.where("lower(topics.name) = ?", params[:id].downcase).first
    @course = @topic.course
    @activities = @topic.sections.first.activities
    render 'courses/show'
  end

  def list
    @topics = Topic.find(params[:ids])
   render :json => @topics

  end

end
