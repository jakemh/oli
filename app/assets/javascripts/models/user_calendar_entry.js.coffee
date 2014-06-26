Oli.UserCalendarEntry = DS.Model.extend
  component: DS.belongsTo('component')
  entry: DS.attr('string', defaultValue: "")
  context: DS.attr('string')
  date: DS.attr('date')
  active: DS.attr('boolean')
  added_to_calendar: DS.attr('boolean')