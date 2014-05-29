Oli.Activity = DS.Model.extend({
  name: DS.attr('string')
  section: DS.belongsTo('section', {async: true})
  template: DS.attr('string')
  description: DS.attr('string')
  components: DS.hasMany('component', {async: true})
  completed: false
});