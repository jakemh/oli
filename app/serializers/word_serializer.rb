class WordSerializer < ActiveModel::Serializer
  attributes :id, :word, :selected, :component

  def selected
    object.selected(current_user)
  end

  has_one :boxx, embed: :id, key: :boxx
  
  # has_many :selections, embed: :ids,  key: :selections
end
