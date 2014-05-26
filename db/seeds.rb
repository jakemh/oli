@topic_list = ["Values", "Strengths", "Passions", "LifeStyle", "Environment"]
@section_list = ["Level 1", "Level 2", "Level 3"]
@sub_section_list = ["Start", "Discover", "Share"]
@activity_count = 10
innerOLI = Course.create(:name => "OLI")
innerOLI2 = Course.create(:name => "OLI2")
innerOLI3 = Course.create(:name => "OLI3")


def add_content_to_course(course, options = {})
  @topic_list.each do |topic|
    t = Topic.create!(:name => topic, :course => course)
    @section_list.each do |section|
      s = t.sections.create!(:name => section)
      # @sub_section_list.each do |sub|
      #   activity_container = s.children.create!(:name => sub)
      @activity_count.times.each do |i|
        name = "Excercise #{i}"
        name = "Start" if i == 0
        name = "End" if i == @activity_count - 1
        s.activities << Activity.create(:name => name) unless options[:no_activities]
      end
      # end
    end
  end
end


add_content_to_course(innerOLI)
add_content_to_course(innerOLI2, {:no_activities => true})
add_content_to_course(innerOLI3, {:no_activities => true})




admin = Role.create(:name => "admin")
super_admin = Role.create(:name => "super_admin")
customer = Role.create(:name => "customer")

ahalya = User.create(:name => "ahalya", :email => "ahalya@ahalyakumaran.com", :password => "inneroli2014")
jake = User.create(:name => "jake", :email => "jakemh@gmail.com", :password => "inneroli2014")
beth = User.create(:name => "beth", :email => "who@beth.is", :password => "inneroli2014")
bob = User.create(:name => "bob", :email => "bob@gmail.com", :password => "inneroli2014")
# poor jack has no access to any courses
jack = User.create(:name => "jack", :email => "jack@gmail.com", :password => "inneroli2014")

ahalya.roles << super_admin
jake.roles << super_admin
beth.roles << admin
bob.roles << customer

ahalya.courses << innerOLI
bob.courses << innerOLI
jake.courses << innerOLI



# def add_content_to_course(course, options = {})
#   @topic_list.each do |topic|
#     t = Topic.create!(:name => topic, :course => course)
#     @section_list.each do |section|
#       s = t.sections.create!(:name => section)
#       @sub_section_list.each do |sub|
#         activity_container = s.children.create!(:name => sub)
#         @activity_count.times.each do |i|
#           name = "Excercise #{i}"
#           name = "Start" if i == 0
#           name = "End" if i == @activity_count - 1
#           activity_container.activities << Activity.create(:name => name) unless options[:no_activities]
#         end
#       end
#     end
#   end
# end