Oli.Activity = DS.Model.extend({
  display: DS.attr('boolean')
  name: DS.attr('string')
  tip: DS.attr('string')
  section: DS.belongsTo('section', async: true)
  template: DS.attr('string')
  description: DS.attr('string')
  components: DS.hasMany('component', async: true)
  completed: DS.attr('boolean')
  justCompleted: false
  dependencies: DS.hasMany('activity', async: true)
  box_dependencies: DS.hasMany('box', async: true)

});