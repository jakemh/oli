class Course < ActiveRecord::Base
  has_many :sign_ups
  has_many :users, :through => :sign_ups
  has_many :topics, dependent: :destroy
  has_many :sections, :through => :topics
  has_many :activities, :through => :sections
  has_many :components, :through => :activities
  has_many :user_entries, :through => :components

  has_many :payments, as: :purchasable
end
