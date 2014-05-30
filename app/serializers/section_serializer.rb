class SectionSerializer < ActiveModel::Serializer
  attributes :id, :name

  embed :ids
  
  def activities
    object.activities.sort
  end

  has_many :activities, key: :activities
end
