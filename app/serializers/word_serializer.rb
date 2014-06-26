class WordSerializer < ActiveModel::Serializer
  attributes :id, :word, :selected, :component, :box

  def selected
    object.selected(current_user)
  end

  def box
    boxable = object.boxables.where(:user => current_user).last
    if boxable
      box = boxable.box.id
    else nil
    end
  end

  # has_many :selections, embed: :ids,  key: :selections
end
