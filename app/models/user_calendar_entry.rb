class UserCalendarEntry < ActiveRecord::Base
  belongs_to :component
  belongs_to :user
end
