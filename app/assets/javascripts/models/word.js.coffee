Oli.Word = DS.Model.extend({
  
  word: DS.attr('string')
  component: DS.belongsTo('component', {async: true})
  selected: DS.attr('boolean')

  test: (->
    @.save() if @get('isDirty')
      
  ).property('selected')
});
