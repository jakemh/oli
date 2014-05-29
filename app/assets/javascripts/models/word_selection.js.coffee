Oli.WordSelection = Oli.Component.extend({
  words: DS.hasMany('words', {async:true})
  activity: DS.belongsTo('activity', {async: true})
});