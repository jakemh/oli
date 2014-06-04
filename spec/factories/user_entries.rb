# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user_entry do
    component_id 1
    user_id 1
    post "MyText"
    content_type "MyString"
  end
end
