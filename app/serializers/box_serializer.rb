class BoxSerializer < ActiveModel::Serializer
  attributes :id


  def words
    Word.all_for_box(current_user, object)
  end

  embed :ids
  has_many :words, key: :words
  has_many :ratings, key: :ratings
end
