Oli.Boxx = DS.Model.extend
  words: DS.hasMany('word', async: true)
  component: DS.belongsTo('component')
