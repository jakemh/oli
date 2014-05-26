Oli.Section = DS.Model.extend({
  name: DS.attr('string'), 
  topic: DS.belongsTo('topic', {async: true}),
  activities: DS.hasMany('activity', {async: true})
});