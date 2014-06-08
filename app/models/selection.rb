class Selection < ActiveRecord::Base
  belongs_to :word
  belongs_to :user

  validates :user, :presence => true
  validates :word, :presence => true
end
