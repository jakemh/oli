class Section < ActiveRecord::Base
  acts_as_tree

  belongs_to :topic
  # validates_uniqueness_of :name, :scope => :section
  has_many :videos
end
