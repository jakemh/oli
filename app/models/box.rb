class Box < ActiveRecord::Base
  has_many :boxables
  has_many :words, through: :boxable
  has_many :ratings, dependent: :destroy

end
