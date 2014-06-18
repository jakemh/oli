Oli.Entry = DS.Model.extend
  component: DS.belongsTo('component')
  post: DS.attr('string', defaultValue: "")
  context: DS.attr('string')
