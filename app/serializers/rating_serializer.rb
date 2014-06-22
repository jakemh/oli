class RatingSerializer < ActiveModel::Serializer
  attributes :id, :value, :box, :context

  def box
    object.box.id
  end
end
