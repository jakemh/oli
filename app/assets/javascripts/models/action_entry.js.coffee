Oli.ActionEntry = DS.Model.extend
  component: DS.belongsTo('component')
  boxEntries: DS.hasMany("boxEntry", async: true)  
  post: DS.attr('string', defaultValue: "")
  context: DS.attr('string')
  boxes: DS.hasMany('box', async: true)