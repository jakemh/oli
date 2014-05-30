class ComponentSerializer < ActiveModel::Serializer
  attributes :id, :content, :activity_id

  embed :ids
  has_many :words,  key: :words

end
