class Boxable < ActiveRecord::Base
  belongs_to :user
  belongs_to :word
  belongs_to :box
  has_many :boxable_entries
  has_many :action_entries, :through => :boxable_entries
end
