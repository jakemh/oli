class Implement < ActiveRecord::Base
  has_many :activities
  has_many :components
end
