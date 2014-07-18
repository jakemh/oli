class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :account_type, :role
  
  embed :ids
  def courses
    object.courses.uniq
  end

  has_many :courses, key: :courses
end
