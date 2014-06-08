class WordSerializer < ActiveModel::Serializer
  attributes :id, :word, :selected


  def selected
    object.selected(current_user)
  end
  
  # has_many :selections, embed: :ids,  key: :selections
end
