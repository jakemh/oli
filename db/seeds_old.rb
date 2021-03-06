fcomponents = [

  :answer_form, 
  :email_form, 
  :word_select,
  :question_answer,
  :video
]


@vid1_trans = '''
Values represent a big part of who you are. Values represent what is essential and most important to you. They are not universal morals, nor are they standards of good and evil. They are not things that come and go, or principles that you develop over time. Values represent that which, if honred fully, will bring immense fulfillment to your life. 
<br><br>
First you must discover your values. Then, you must honor them on a regular basis to be happy and fulfilled. 
'''

@activities_level_1 = [
  {:video => "Intro"},
  {:questions_answers => "Experience 1A"},
  {:questions_answers => "Experience 2A"},
  {:questions_answers => "Experience 3A"},
  {:questions_values => "Experience 1B"},
  {:questions_values => "Experience 2B"},
  {:questions_values => "Experience 3B"},
  {:choose_word => "Word Select"},
  {:word_thread => "Word Thread"},
  {:share_2 => "Share with a Buddy!"},
  {:share_1 => "Share Your Progress!"}
]

@activities_level_2 = [
  {:thread_rating => "Rate Thread 1"},
  {:thread_rating => "Rate Thread 2"},
  {:thread_rating => "Rate Thread 3"},
  {:thread_rating => "Rate Thread 4"},
  {:thread_rating => "Rate Thread 5"},
  {:thread_rating => "Rate Thread 6"},
  {:describe_a_10 => "Describe a 10 1"},
  {:describe_a_10 => "Describe a 10  2"},
  {:describe_a_10 => "Describe a 10 3"},
  {:describe_a_10 => "Describe a 10 4"},
  {:describe_a_10 => "Describe a 10 5"},
  {:describe_a_10 => "Describe a 10 6"},
]

@activities_level_3 = [
  {:calendar => "Take action!"},

]

@activities = {
  "Level 1" => @activities_level_1,
  "Level 2" => @activities_level_2,
  "Level 3" => @activities_level_3
}




@topic_list = ["Values", "Strengths", "Passions", "LifeStyle", "Environment"]
@section_list = ["Level 1", "Level 2", "Level 3"]
@sub_section_list = ["Start", "Discover", "Share"]

@activity_count = [
  @activities_level_1.count,
  @activities_level_2.count,
  @activities_level_3.count
]

innerOLI = Course.create(:name => "OLI")
innerOLI2 = Course.create(:name => "OLI2")
innerOLI3 = Course.create(:name => "OLI3")

def add_content_to_course(course, options = {})
  @topic_list.each do |topic|
    t = Topic.create!(:name => topic, :course => course)
    # @section_list.each_with_index do |section, i|
    @activities.each_with_index do |(k,v), i|

      s = t.sections.create!(:name => k)
      @activity_count[i].times.each do |j|
        template = v[j].keys[0]
        name = v[j].values[0]
        s.activities << Activity.create!(:name => name, :template => template, :tip => "Tip #{j}") unless options[:no_activities]
      end
    end
  end
end

add_content_to_course(innerOLI)
add_content_to_course(innerOLI2, {:no_activities => true})
add_content_to_course(innerOLI3, {:no_activities => true})

act_set_1 = Course.first.topics.first.sections.first.activities

ex0 = act_set_1.where(:template => "video").first
ex0.components << Component.create(:context => :video, :content => @vid1_trans)

######################

experience1 = act_set_1.where(:template => "questions_answers").first
experience1.description = "Think of a peak time in your life, a time of extreme pleaseure or joy, learning or accomplishment, peace or power. It may be a moment in time, or mayb have happened over a long period. It may have been one day, one week, a couple months, or a couple years. Describe this time, keeping in mind the following questions:"
experience1.save
experience1_comp1 = Component.create!( :context => :question_answer,:title => "Peak Experience #1",
  # :content => "Think of a peak time in your life, a time of extreme pleaseure or joy, learning or accomplishment, peace or power. It may be a moment in time, or mayb have happened over a long period. It may have been one day, one week, a couple months, or a couple years. Describe this time, keeping in mind the following questions:"
  )
experience1.components << experience1_comp1

experience2 = act_set_1.where(:template => "questions_answers").second
experience2.description = "Think of a second peak time in your life, a time of extreme pleaseure or joy, learning or accomplishment, peace or power. It may be a moment in time, or mayb have happened over a long period. It may have been one day, one week, a couple months, or a couple years. Describe this time, keeping in mind the following questions:"
experience2.save
experience2_comp1 = Component.create!(:context => :question_answer,:title => "Peak Experience #2",

  # :content => "Think of a second peak time in your life, a time of extreme pleaseure or joy, learning or accomplishment, peace or power. It may be a moment in time, or mayb have happened over a long period. It may have been one day, one week, a couple months, or a couple years. Describe this time, keeping in mind the following questions:"
  )
experience2.components << experience2_comp1

experience3 = act_set_1.where(:template => "questions_answers").third
experience3.description = "Think of a third peak time in your life, a time of extreme pleaseure or joy, learning or accomplishment, peace or power. It may be a moment in time, or mayb have happened over a long period. It may have been one day, one week, a couple months, or a couple years. Describe this time, keeping in mind the following questions:"
experience3.save
experience3_comp1 = Component.create!(:context => :question_answer,:title => "Peak Experience #3",
  # :content => "Think of a third peak time in your life, a time of extreme pleaseure or joy, learning or accomplishment, peace or power. It may be a moment in time, or mayb have happened over a long period. It may have been one day, one week, a couple months, or a couple years. Describe this time, keeping in mind the following questions:"
  )
experience3.components << experience3_comp1

######################

experienceValues1 = act_set_1.where(:template => "questions_values").first
experienceValues1.description = "For your first peak experience, extract the most significant values. Discover at least 5 values."
experienceValues1.save
experienceValues1_comp1 = WordSelection.create!( :context => :questions_values,:title => "Peak Experience #1",
  # :content => "For your first peak experience, extract the most significant values. Discover at least 5 values."
  )
experienceValues1.components << experienceValues1_comp1
experienceValues1.activity_dependencies << ActivityDependency.create(:dependent_activity_id => experience1.id)

experienceValues2 = act_set_1.where(:template => "questions_values").second
experienceValues2.description = "For your second peak experience, extract the most significant values. Discover at least 5 values."
experienceValues2.save

experienceValues2_comp1 = WordSelection.create!(:context => :questions_values,:title => "Peak Experience #2",
  # :content => "For your second peak experience, extract the most significant values. Discover at least 5 values."
  )
experienceValues2.components << experienceValues2_comp1
experienceValues2.activity_dependencies << ActivityDependency.create(:dependent_activity_id => experience2.id)

experienceValues3 = act_set_1.where(:template => "questions_values").third
experienceValues3.description = "For your third peak experience, extract the most significant values. This time, discover at least 10 values."
experienceValues3.save
experienceValues3_comp1 = WordSelection.create!(:context => :questions_values,:title => "Peak Experience #3",
  # :content => "For your third peak experience, extract the most significant values. Just to keep you guessing, youst must now discover at least 10 values."
  )
experienceValues3.components << experienceValues3_comp1
experienceValues3.activity_dependencies << ActivityDependency.create(:dependent_activity_id => experience3.id)

######################




ex2 = act_set_1.where(:template => "choose_word").first

ex2.description = 
'''
Pull out the values that were being honored in that experience. Perhaps it was connection or freedom or adventure. Select 5 words that you associate with this experience, keeping in mind the following:
'''
ex2.save

w_s = WordSelection.create!(:content => "Select Words", :context => "word_select")
words = 20.times.inject([]){|result, element| result << Word.create(:word => "Word #{element + 1}", :all_users => true) }
words.sort
ex2.components << w_s
ex2.components[0].words = words

thread_ex = Activity.where(:template => :word_thread).first
thread_ex.description = '''
Drag and drop the values words into the different threads. Group the values in a wa that is meaningful to you and your peak experiences. Create at least 4 value thread and as many as 6. Be sure to use up all your values!
'''
thread_ex.save

dep1 = ActivityDependency.create(:dependent_activity_id => experienceValues1.id)
dep2 = ActivityDependency.create(:dependent_activity_id => experienceValues2.id)
dep3 = ActivityDependency.create(:dependent_activity_id => experienceValues3.id)
dep4 = ActivityDependency.create(:dependent_activity_id => ex2.id)

thread_ex.activity_dependencies << [dep1, dep2, dep3, dep4]
word_thread_component = Component.create(:context => :word_thread)
word_thread_component.boxes << 7.times.inject([]){|result, element| result << Box.create}
thread_ex.components << word_thread_component


share_1 = act_set_1.where(:template => "share_1").first
share_2 = act_set_1.where(:template => "share_2").first

share_1.components << Component.create!(:context => :share_box_fb)
share_2.components << [
  Component.create!(:context => :email_address, :content => ""),
  Component.create!(:context => :email_subject, :content => "Prefilled subject line"),
  Component.create!(:context => :email_body, :content => "Prefilled body line")
]





  



admin = Role.create(:name => "admin")
super_admin = Role.create(:name => "super_admin")
customer = Role.create(:name => "customer")

ahalya = User.create(:name => "ahalya", :email => "ahalya@ahalyakumaran.com", :password => "inneroli2014")
jake = User.create(:name => "jake", :email => "jakemh@gmail.com", :password => "inneroli2014")
beth = User.create(:name => "beth", :email => "who@beth.is", :password => "inneroli2014")
bob = User.create(:name => "bob", :email => "bob@gmail.com", :password => "inneroli2014")
# poor jack has no access to any courses
jack = User.create(:name => "jack", :email => "jack@gmail.com", :password => "inneroli2014")

first_act = Course.first.activities.first
second_act = Course.first.activities.second
third_act = Course.first.activities.third

stat1 = Status.create(:activity => first_act, :user => jake, :completed => true)
stat2 = Status.create(:activity => second_act, :user => jake, :completed => true)
stat3 = Status.create(:activity => third_act, :user => jake, :completed => true)

ahalya.roles << super_admin
jake.roles << super_admin
beth.roles << admin
bob.roles << customer

ahalya.courses << innerOLI
bob.courses << innerOLI
jake.courses << innerOLI


