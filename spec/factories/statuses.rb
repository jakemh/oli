# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :status do
    activity_id 1
    user_id 1
    completed false
  end
end
