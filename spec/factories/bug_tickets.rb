# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :bug_ticket do
    description "MyText"
    error "MyText"
    user_id 1
    url "MyString"
  end
end
