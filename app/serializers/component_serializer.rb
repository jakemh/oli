class ComponentSerializer < ActiveModel::Serializer
  attributes :id, :content, :activity_id, :is_completed, :type, :context, :title

  embed :ids
  
  def user_entries
    object.user_entries.where(:user => current_user)
  end

  has_many :user_entries, key: :entries
  has_many :boxes, key: :boxes
end
