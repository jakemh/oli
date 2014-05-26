class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name

  embed :ids
  has_many :topics,  key: :topics
end
