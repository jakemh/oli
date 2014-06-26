class Boxable < ActiveRecord::Base
  belongs_to :user
  belongs_to :word
  belongs_to :box
end
