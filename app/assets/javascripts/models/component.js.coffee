Oli.Component = DS.Model.extend({
  content: DS.attr('string')
  activity: DS.belongsTo('activity', {async: true})
  user_content: DS.attr('string')

  words: DS.hasMany('word', {async: true})
});