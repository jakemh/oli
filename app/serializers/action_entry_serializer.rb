class ActionEntrySerializer < ActiveModel::Serializer
  attributes :id, :component, :post, :context

  def component
    object.component.id
  end

  has_many :boxes, embed: :ids, key: :boxes
end
