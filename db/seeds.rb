require 'csv'

id_hash = {} #csv_id => actual_id

options = {:encoding => 'UTF-8', :skip_blanks => true, :headers => true}
file = [File.dirname(__FILE__), 'structure.csv' ].join("/")


#build structure
CSV.foreach(file, options) do |row|
  course = Course.find_or_create_by(:name => row["course"])
  topic = Topic.find_or_create_by(:course => course, :name => row["topic"]) 
  section = Section.find_or_create_by(:topic => topic, :name => row["section"])
end

#build activities
CSV.foreach([File.dirname(__FILE__), 'content.csv' ].join("/"), options) do |row, i|

  course = Course.where(:name => row["course"]).first
  topic = Topic.where(:name => row["topic"], :course => course).first
  section = Section.where(:name => row["section"], :topic => topic).first
  components = []
  dependencies = []
  component_constant_string = row["c_type"]
  component_constant = nil

  if component_constant_string
    component_constant = Kernel.const_get(component_constant_string) 
  else component_constant = Component
  end

  if row["c_1_name"]
    components << component_constant.create!(
      :context => row["c_1_name"], 
      :content => row["sub_text_1"]
      )
  end

   if row["c_2_name"]
    components << component_constant.create!(
      :context => row["c_2_name"], 
      :content => row["sub_text_2"]
      )
  end

   if row["c_3_name"]
    components << component_constant.create!(
      :context => row["c_3_name"], 
      :content => row["sub_text_3"]
      )
  end

  

  a = Activity.create!(
    :section => section,
    :template => row["template"],
    :name => row["title"],
    :description => row["main_text"],
    :tip => row["tip"]
    )

  a.components << components
  id_hash[row["id"]] = a.id

  if row["dependencies"]
    row["dependencies"].split(",").each do |id|
      dependencies << ActivityDependency.create(
        :dependent_activity_id => id_hash[id]
        )
    end
  end


  a.activity_dependencies << dependencies

  if row["boxes"]
    a.components.first.boxes << row["boxes"].to_i.times.inject([]){|result, element| result << Box.create}
  end
end

#build words
file = [File.dirname(__FILE__), 'words.csv' ].join("/")

CSV.foreach(file, options) do |row|
  activity = Activity.find(id_hash[row["activity_id"]])
  activity.components.first.words << Word.create(:word => row["word"], :all_users => true)
end

file = [File.dirname(__FILE__), 'additional_info.csv' ].join("/")

#misc stuff
CSV.foreach(file, options) do |row|
  
  if row["box_id"]
    real_id = id_hash[row["activity_id"]]
    activity = Activity.find(real_id)
    real_row_dependency_id = id_hash[row["dependency"]].to_i
    dependeded_on_activity = Activity.find(real_row_dependency_id)
    dep = activity.activity_dependencies.where(:dependent_activity_id => real_row_dependency_id).first
    dep.box_id = dependeded_on_activity.components.first.boxes.limit(1).offset(row["box_id"].to_i - 1).first.id
    dep.save
  end
end

User.find([1,2,3]).each{|u| u.courses << Course.first}

# admin = Role.create(:name => "admin")
# super_admin = Role.create(:name => "super_admin")
# customer = Role.create(:name => "customer")

# ahalya = User.create(:name => "ahalya", :email => "ahalya@ahalyakumaran.com", :password => "inneroli2014")
# jake = User.create(:name => "jake", :email => "jakemh@gmail.com", :password => "inneroli2014")
# beth = User.create(:name => "beth", :email => "who@beth.is", :password => "inneroli2014")
# bob = User.create(:name => "bob", :email => "bob@gmail.com", :password => "inneroli2014")
# # poor jack has no access to any courses
# jack = User.create(:name => "jack", :email => "jack@gmail.com", :password => "inneroli2014")

# first_act = Course.first.activities.first
# second_act = Course.first.activities.second
# third_act = Course.first.activities.third

# stat1 = Status.create(:activity => first_act, :user => jake, :completed => true)
# stat2 = Status.create(:activity => second_act, :user => jake, :completed => true)
# stat3 = Status.create(:activity => third_act, :user => jake, :completed => true)

# ahalya.roles << super_admin
# jake.roles << super_admin
# beth.roles << admin
# bob.roles << customer

# ahalya.courses << Course.first
# bob.courses << Course.first
# jake.courses << Course.first


