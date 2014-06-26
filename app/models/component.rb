class Component < ActiveRecord::Base
  belongs_to :activity
  has_many :user_entries, dependent: :destroy
  has_many :user_calendar_entries, dependent: :destroy

  has_many :boxes, dependent: :destroy
end
