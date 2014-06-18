class UserEntrySerializer < ActiveModel::Serializer
  attributes :id, :post, :context

  def post
    object.post || ""
  end

  embed :ids
end
