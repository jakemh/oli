class WordSelectionSerializer < ComponentSerializer

  def words
    object.words.sort
  end

  has_many :words,  key: :words

end
