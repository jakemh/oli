class SectionSerializer < ActiveModel::Serializer
  attributes :id, :name

  embed :ids
  has_many :activities, key: :activities
end
