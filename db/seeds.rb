# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# define roles

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

innerOLI = Course.create(:name => "innerOLI")
ahalya.courses << innerOLI
bob.courses << innerOLI
jake.courses << innerOLI

topic_values = Topic.create(:name => "Values", :course => innerOLI)
topic_strength = Topic.create(:name => "Strengths", :course => innerOLI)
topic_passions = Topic.create(:name => "Passions", :course => innerOLI)
topic_lifestyle = Topic.create(:name => "Lifestyle", :course => innerOLI)
topic_environment = Topic.create(:name => "Environment", :course => innerOLI)

innerOLI.topics.each do |topic|
  section_start = Section.create(:name => "Start")
  section_discover = Section.create(:name => "Discover")
  section_share = Section.create(:name => "Share")
  topic.sections << section_start 
  topic.sections << section_discover 
  topic.sections << section_share 
end

innerOLI2 = Course.create(:name => "innerOLI2")
jake.courses << innerOLI2
topic_values2 = Topic.create(:name => "Values2", :course => innerOLI2)
topic_strength2 = Topic.create(:name => "Strengths2", :course => innerOLI2)
topic_passions2 = Topic.create(:name => "Passions2", :course => innerOLI2)
topic_lifestyle2 = Topic.create(:name => "Lifestyle2", :course => innerOLI2)
topic_environment2 = Topic.create(:name => "Environmen2t", :course => innerOLI2)

innerOLI2.topics.each do |topic|
  section_start = Section.create(:name => "Start")
  section_discover = Section.create(:name => "Discover")
  section_share = Section.create(:name => "Share")
  topic.sections << section_start 
  topic.sections << section_discover 
  topic.sections << section_share 
end
