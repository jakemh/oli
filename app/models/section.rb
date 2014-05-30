class Section < ActiveRecord::Base
  # acts_as_tree

  belongs_to :topic
  has_many :activities, dependent: :destroy


end
