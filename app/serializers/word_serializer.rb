class WordSerializer < ActiveModel::Serializer
  attributes :id, :word, :selected, :component

  def selected
    object.selected(current_user)
  end

  has_one :box, embed: :id, key: :box
  
  # has_many :selections, embed: :ids,  key: :selections
end
