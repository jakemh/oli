Oli.Rating = DS.Model.extend
  value: DS.attr('number')
  context: DS.attr('string')
  box: DS.belongsTo('box', async: true)