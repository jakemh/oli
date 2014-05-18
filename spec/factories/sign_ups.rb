# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :sign_up, :class => 'SignUps' do
    user_id 1
    course_id 1
  end
end
