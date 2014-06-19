# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :rating do
    box_id 1
    value 1
    context "MyString"
  end
end
