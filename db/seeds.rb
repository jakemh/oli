templates = ["questions_answer", "choose_word"]
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
        name = "Exercise #{i}"
        name = "Start" if i == 0
        name = "End" if i == @activity_count - 1
        s.activities << Activity.create(:name => name, :template => "empty") unless options[:no_activities]
      end
      # end
    end
  end
end


add_content_to_course(innerOLI)
add_content_to_course(innerOLI2, {:no_activities => true})
add_content_to_course(innerOLI3, {:no_activities => true})

ex1 = Course.first.activities.find(2)
ex1.description = 
'''
Think of a peak time in your life, a time of extreme pleaseure or joy, learning or accomplishment, peace or power. It may be a moment in time, or mayb have happened over a long period. It may have been one day, one week, a couple months, or a couple years. Describe this time, keeping in mind the following questions:

'''

ex1.template = "questions_answers"
ex1.save

ex2 = Course.first.activities.find(3)
ex2.description = 
'''
Pull out the values that were being honored in that experience. Perhaps it was connection or freedom or adventure. Select 5 words that you associate with this experience, keeping in mind the following:
'''

ex2.template="choose_word"
w_s = WordSelection.create(:content => "Select Words")
words = 25.times.inject([]){|result, element| result << Word.create(:word => "Word #{element + 1}") }
ex2.components << w_s
ex2.components[0].words = words
ex2.save


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
