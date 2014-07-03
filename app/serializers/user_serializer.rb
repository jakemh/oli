class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :account_type, :role
  
end
