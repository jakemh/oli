class SectionsController < TopicsController

  def show
    @section = Course.find(params[:course_id]).topics
      .where("lower(topics.name) = ?", params[:topic_id].downcase).first.
        sections.where("lower(sections.name) = ?", params[:id].downcase).first
    @topic = @section.topic
    @course = @topic.course
    @activities = @section.activities
    render 'courses/show'
  end

  def list
    render :json => Section.find(params[:ids])
  end
end
