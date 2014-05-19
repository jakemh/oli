class Topic < ActiveRecord::Base
  belongs_to :course
  has_many :sections
  validates_uniqueness_of :name, :scope => :course
end
