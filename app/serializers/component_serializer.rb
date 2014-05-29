class ComponentSerializer < ActiveModel::Serializer
  attributes :id
  embed :ids
  has_many :words,  key: :words
end
