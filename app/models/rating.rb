class Rating < ActiveRecord::Base
  belongs_to :box
  belongs_to :user
end
