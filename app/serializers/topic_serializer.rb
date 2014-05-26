class TopicSerializer < ActiveModel::Serializer
  attributes :id, :name

  embed :ids
  has_many :sections, key: :sections
end
