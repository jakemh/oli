# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :activity_dependency do
    activity_id 1
    dependent_activity_id 1
  end
end
