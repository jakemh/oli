class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :account_type, :role
  
  embed :ids

  has_many :courses, key: :courses
end
