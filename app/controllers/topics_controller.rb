class TopicsController < CoursesController

  def show
    @topic = @course.topics.where("lower(topics.name) = ?", params[:id].downcase).first
    @course = @topic.course
    render 'courses/show'
  end

end
