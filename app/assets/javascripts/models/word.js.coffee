Oli.Word = DS.Model.extend
  
  word: DS.attr('string')
  box: DS.belongsTo('box', async: true)
  component: DS.belongsTo('component')
  selected: DS.attr('boolean')
  # belongsTo: DS.belongsTo('box', async: true)
  test: (->
    @save() if @get('isDirty')
  ).property('selected')

  removeBox: (->

    if @get('selected') == false

      @get("box").then (box)=>
        if box
          box.get('words').then (words)=>
            words.removeObject(@)

  ).observes("selected")