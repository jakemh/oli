class Activity < ActiveRecord::Base
  has_many :exercises
  has_many :videos
end
