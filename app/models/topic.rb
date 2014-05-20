class Topic < ActiveRecord::Base
  belongs_to :course
  has_many :sections, dependent: :destroy
  validates_uniqueness_of :name, :scope => :course
end
