class Payment < ActiveRecord::Base
  belongs_to :user
  belongs_to :purchasable, polymorphic: true
  validates :user, :presence => true

end
