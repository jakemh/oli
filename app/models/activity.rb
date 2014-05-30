class Activity < ActiveRecord::Base
  belongs_to :section
  has_many :components, dependent: :destroy
end
