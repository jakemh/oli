@topic_list = ["Values", "Strengths", "Passions", "LifeStyle", "Environment"]
@section_list = ["Level 1", "Level 2", "Level 3"]
@sub_section_list = ["Start", "Discover", "Share"]

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
innerOLI2 = Course.create(:name => "innerOLI2")

ahalya.courses << innerOLI
bob.courses << innerOLI
jake.courses << innerOLI



def add_content_to_course(course)
  @topic_list.each do |topic|
    t = Topic.create!(:name => topic, :course => course)
    @section_list.each do |section|
      s = t.sections.create!(:name => section)
      @sub_section_list.each do |sub|
        s.children.create!(:name => sub)
      end
    end
  end
end


add_content_to_course(innerOLI)
add_content_to_course(innerOLI2)

