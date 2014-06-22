Oli.Activity = DS.Model.extend({
  name: DS.attr('string')
  tip: DS.attr('string')
  section: DS.belongsTo('section', async: true)
  template: DS.attr('string')
  description: DS.attr('string')
  components: DS.hasMany('component', async: true)
  completed: DS.attr('boolean')
  dependencies: DS.hasMany('activity')
  box_dependencies: DS.hasMany('box', async: true)

});