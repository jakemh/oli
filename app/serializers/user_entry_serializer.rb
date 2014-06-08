class UserEntrySerializer < ActiveModel::Serializer
  attributes :id, :post, :content_type
  embed :ids
end
