class Box < ActiveRecord::Base
  has_many :words
  has_many :ratings, dependent: :destroy

end
