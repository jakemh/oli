
class ComponentSerializer < ActiveModel::Serializer
  attributes :id, :content, :activity, :is_completed, :type, :context, :title, :file_name

  
  def user_entries
    object.user_entries.where(:user => current_user)
  end

  def activity
    object.activity_id
  end

  def user_calendar_entries
    object.user_calendar_entries.where(:user => current_user)
  end

  def action_entries
    current_user.action_entries.where(:component => object)
  end

  embed :ids

  has_many :user_entries, key: :entries
  has_many :action_entries, key: :actionEntries

  has_many :boxes, key: :boxes
  has_many :user_calendar_entries, :key => "userCalendarEntries"

end
