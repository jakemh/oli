class Component < ActiveRecord::Base
  belongs_to :activity
  has_many :user_entries
  # validates :master_id, :presence => true


end
