class Activity < ActiveRecord::Base
  belongs_to :section
  has_one :topic, :through => :section
  has_one :course, :through => :topic
  has_many :components, dependent: :destroy
  has_many :user_components
  has_many :users, :through => :course
  # has_many :statuses, :through => :users
  has_many :statuses
  # has_one :status, :through => current_user
  # has_one :status, :scope => current_user.statuses.where(:activity => this)

  def status(current_user)
    Status.where(:activity => self, :user => current_user)
  end

  def update_completed(status, current_user)
    status_obj = status(current_user).first
    if status_obj
      status_obj.update_attributes(:status => status)
    else Status.create(:activity => self, :user => current_user, :completed => status)
    end
  end
end
