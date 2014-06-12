Oli.Entry = DS.Model.extend
  component: DS.belongsTo('component')
  post: DS.attr('string')
  context: DS.attr('string')
