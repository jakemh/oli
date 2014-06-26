class UserCalendarEntrySerializer < ActiveModel::Serializer
  attributes :id, :context, :component, :entry,
            :date, :active, :added_to_calendar

  def component
    object.component.id
  end

end
