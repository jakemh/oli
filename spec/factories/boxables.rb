# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :boxable do
    user_id "MyString"
    integer "MyString"
    box_id 1
    word_id 1
  end
end
