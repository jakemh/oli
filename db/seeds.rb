# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

innerOLI = Course.create(:name => "innerOLI")
topic_values = Topic.create(:name => "Values", :course => innerOLI)
topic_strength = Topic.create(:name => "Strengths", :course => innerOLI)
topic_passions = Topic.create(:name => "Passions", :course => innerOLI)
topic_lifestyle = Topic.create(:name => "Lifestyle", :course => innerOLI)
topic_environment = Topic.create(:name => "Environment", :course => innerOLI)

innerOLI.topics.each do |topic|
  section_start = Section.create(:name => "Start")
  section_discover = Section.create(:name => "Discover")
  section_share = Section.create(:name => "Share")
end