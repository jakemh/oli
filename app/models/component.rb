class Component < ActiveRecord::Base
  belongs_to :activity
  has_many :words, :as => :wordable
end
