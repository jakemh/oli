Oli.Component = DS.Model.extend({
  content: DS.attr('string')
  context: DS.attr('string')
  title: DS.attr('string')
  activity: DS.belongsTo('activity', {async: true})
  userContent: DS.attr('string')
  entries: DS.hasMany('entry', {async: true})
  words: DS.hasMany('word', {async: true})
});