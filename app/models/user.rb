class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :sign_ups
  has_many :permissions
  has_many :roles, :through => :permissions
  has_many :courses, :through => :sign_ups
  has_many :statuses
  has_many :components
  has_many :user_entries
  has_many :user_calendar_entries
  has_many :action_entries
  has_many :ratings
  has_many :selections
  has_many :words
  has_many :boxables 
  
  validate :name, :presence => true
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable


  def role
    self.roles.first.name
  end

  def role?(role)
    return self.roles.pluck(:name).include? role
  end
end
