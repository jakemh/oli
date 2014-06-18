Oli.Word = DS.Model.extend
  
  word: DS.attr('string')
  boxx: DS.belongsTo('boxx')
  component: DS.belongsTo('component')
  selected: DS.attr('boolean')
  # belongsTo: DS.belongsTo('box', async: true)
  test: (->
    @save() if @get('isDirty')
  ).property('selected')
