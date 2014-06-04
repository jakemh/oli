class Word < ActiveRecord::Base
  belongs_to :component
  has_one :user, :through => :component
end
