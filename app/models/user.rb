class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :sign_ups
  has_many :permissions
  has_many :roles, :through => :permissions
  has_many :courses, :through => :sign_ups
  has_many :statuses
  has_many :components
  
  validate :name, :presence => true
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable



  def role?(role)
    return self.roles.pluck(:name).include? role
  end
end
