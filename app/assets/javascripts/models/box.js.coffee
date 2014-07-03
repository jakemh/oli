Oli.Box = DS.Model.extend
  words: DS.hasMany('word', async: true)
  component: DS.belongsTo('component')
  ratings: DS.hasMany("rating", async: true)
  # boxEntries: DS.hasMany("boxEntry", async: true)