Oli.Word = DS.Model.extend
  
  word: DS.attr('string')
  box: DS.belongsTo('box')
  component: DS.belongsTo('component')
  selected: DS.attr('boolean')
  # belongsTo: DS.belongsTo('box', async: true)
  test: (->
    @save() if @get('isDirty')
  ).property('selected')
