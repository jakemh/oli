class Section < ActiveRecord::Base
  belongs_to :topic
  validates_uniqueness_of :name, :scope => :topic
end
