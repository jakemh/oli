class Course < ActiveRecord::Base
  has_many :sign_ups
  has_many :users, :through => :sign_ups
  has_many :topics, dependent: :destroy
end
