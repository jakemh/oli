class SectionsController < TopicsController

  def show
    @section = Course.find(params[:course_id]).topics
      .where("lower(topics.name) = ?", params[:topic_id].downcase).first.
        sections.where("lower(sections.name) = ?", params[:id].downcase).first
    @topic = @section.topic
    @course = @topic.course
    puts "SECTIONS: ",  @topic.sections
    render 'courses/show'
  end
end
