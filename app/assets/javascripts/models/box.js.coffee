Oli.Boxx = DS.Model.extend
  words: DS.hasMany('word', async: false)
  component: DS.belongsTo('component')
