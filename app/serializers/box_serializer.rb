class BoxSerializer < ActiveModel::Serializer
  attributes :id

  embed :ids
  has_many :words, key: :words
  has_many :ratings, key: :ratings
end
