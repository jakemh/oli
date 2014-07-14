class UserEntrySerializer < ActiveModel::Serializer
  attributes :id, :post, :context, :created_at

  def post
    object.post || ""
  end

  embed :ids
end
