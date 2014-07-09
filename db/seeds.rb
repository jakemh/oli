require 'csv'
require_relative 'seeds_base'

options = {:encoding => 'UTF-8', :skip_blanks => true, :headers => true}

#build activities
CSV.foreach([File.dirname(__FILE__), 'content.csv' ].join("/"), options) do |row, i|
  SeedsBase.parse_activity(row)
end

#build words
file = [File.dirname(__FILE__), 'words.csv' ].join("/")

CSV.foreach(file, options) do |row|
  activity = Activity.find(SeedsBase.id_hash[row["activity_id"]])
  activity.components.first.words << Word.create(:word => row["word"], :all_users => true)
end

#misc stuff
file = [File.dirname(__FILE__), 'additional_info.csv' ].join("/")
CSV.foreach(file, options) do |row|
  
  if row["box_id"]
    row["box_id"].split(",").each do |id|
      real_id = SeedsBase.id_hash[row["activity_id"]]
      activity = Activity.find(real_id)
      real_row_dependency_id = SeedsBase.id_hash[row["dependency"]].to_i
      dependeded_on_activity = Activity.find(real_row_dependency_id)
      dep = activity.activity_dependencies.where(:dependent_activity_id => real_row_dependency_id).first
      dep.box_id = dependeded_on_activity.components.first.boxes.limit(1).offset(id.to_i - 1).first.id
      dep.save
    end
  end
end

#free videos
file = [File.dirname(__FILE__), 'free_videos.csv' ].join("/")
CSV.foreach(file, options) do |row|
  SeedsBase.parse_activity(row)
end


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

User.find([1,2,3]).each{|u| u.courses << Course.first}

