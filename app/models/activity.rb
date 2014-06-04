class Activity < ActiveRecord::Base
  belongs_to :section
  has_many :components, dependent: :destroy
  has_many :user_components
end
