class UserEntry < ActiveRecord::Base
  belongs_to :user
  belongs_to :component
  # validates :user, :presence => true
  validates :component, :presence => true
end
