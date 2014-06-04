class WordSelectionSerializer < ComponentSerializer

  def activities
    object.words.sort
  end

  has_many :words,  key: :words

end
