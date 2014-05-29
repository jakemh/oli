class Course < ActiveRecord::Base
  has_many :sign_ups
  has_many :users, :through => :sign_ups
  has_many :topics, dependent: :destroy
  has_many :sections, :through => :topics
  has_many :activities, :through => :sections
end
