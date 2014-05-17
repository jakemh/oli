class Topic < ActiveRecord::Base
  belongs_to :course
  has_many :sections
end
