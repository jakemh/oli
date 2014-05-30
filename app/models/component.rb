class Component < ActiveRecord::Base
  belongs_to :activity
  has_many :words, :as => :wordable, dependent: :destroy
end
