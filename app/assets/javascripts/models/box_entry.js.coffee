Oli.BoxEntry = DS.Model.extend
  actionEntry: DS.belongsTo('actionEntry', async: true)
  # box_id: DS.attr('number')
  boxes: DS.hasMany('box', async: true)