# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user_calendar_entry do
    date "2014-06-25"
    entry "MyText"
    active false
    added_to_calendar false
  end
end
