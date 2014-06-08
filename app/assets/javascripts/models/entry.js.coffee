Oli.Entry = DS.Model.extend
  component: DS.belongsTo('component')
  post: DS.attr('string')
  content_type: DS.attr('string')
