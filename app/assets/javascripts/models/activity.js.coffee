Oli.Activity = DS.Model.extend({
  name: DS.attr('string'), 
  section: DS.belongsTo('section', {async: true})
  completed: false
});