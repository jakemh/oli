class UserEntrySerializer < ActiveModel::Serializer
  attributes :id, :post, :context
  embed :ids
end
