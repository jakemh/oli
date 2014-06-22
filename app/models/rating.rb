class Rating < ActiveRecord::Base
  belongs_to :box
  belongs_to :user


  def self.find_for_user(ids, current_user)
    Rating.where(:id => ids, :user => current_user)
  end
end
