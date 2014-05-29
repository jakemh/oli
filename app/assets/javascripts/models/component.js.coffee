Oli.Component = DS.Model.extend({
  content: DS.attr('string')
  activity: DS.belongsTo('activity', {async: true})
  words: DS.hasMany('word', {async: true})
});