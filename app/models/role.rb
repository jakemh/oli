class Role < ActiveRecord::Base
  CUSTOMER = "customer"
  ADMIN = "admin"
  SUPER_ADMIN = "super_admin"
  
  has_many :users, :through => :permissions


end
