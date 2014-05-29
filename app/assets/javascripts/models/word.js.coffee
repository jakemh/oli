Oli.Word = DS.Model.extend({
  word: DS.attr('string')
  component: DS.belongsTo('component', {async: true})
});