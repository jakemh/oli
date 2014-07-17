class ActionEntrySerializer < ActiveModel::Serializer
  attributes :id, :component, :post, :context, :created_at

  def component
    object.component.id
  end

  def boxes
    object.boxes.uniq
  end

  has_many :boxes, embed: :ids, key: :boxes
end
