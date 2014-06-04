Oli.ActivitiesController = Ember.ObjectController.extend(Ember.Evented,{
  

  needs: ['sections']
  progress: null

  sectionsPerSection: [10,10,10]


  newWordChanged:(->
    alert(@get('newWord'))

  ).property('newWord')

  status: (()->
    
  ).property()

  checked: ->
    alert("TEST")
    
  hash: (() ->
    
    console.log "HASH ACTIVITIES0: "

    hash = {}
    @get('activities').then (acts)->
      console.log "HASH ACTIVITIES: " + acts

      for a, i in acts.toArray()
        hash[a] = (i + 1)
      return hash
    ).property()

  components: (->
    @content.get('components')
    ).property()

  words: ((key, value) ->
    if (arguments.length > 1) 
      return value;

    @get("components").then (cs) =>

      cs.toArray()[0].get('words').then (ws) =>
        # alert "TEST"
            
        @set('words', ws)

    return value
  ).property('[]')

  updateComponents: ->

    @get('components').then (cs)=>
      for c in cs.toArray()
        c.save()

  activities:  ((model, obj) ->
    @get('controllers.sections').get('activities')
    ).property('name')

  nextAct: (act) ->

    @get('hash').then (h)=>
      newActInd = h[act]
      @get('activities').then (acts)=>
        actsArray = acts.toArray()
        console.log "newActInd: " + newActInd
        console.log "actsArrayL: " + actsArray.length

        if act.get('completed') == false
          @trigger('delegate.increaseProgress', @, ->
            # console.log "COMPLETED"
          ) 
          act.set('completed', true)

        if newActInd < actsArray.length
          
          newAct = actsArray[newActInd].get('name')
          @transitionToRoute('activities',newAct)
        
        else  
          @notifyPropertyChange('hash')
          @get('controllers.sections').get('sectionDone').then (done)=>

            if done

              @get('controllers.sections').get('nextLevel')



  actions:

    updateContent: ->
      alert("TEST")

    moveArrow: (element) ->
      @trigger('delegate.setArrow', @) 

    trans: (m)->
      @trigger('delegate.setArrow', @) 

    buttonClicked: (act)->
      @send('nextAct', act)
      @send('updateComponents')

    # nextAct: (act) ->

          
    moveArrow: (element) ->
      console.log "MOVE ARROW"
      console.log @content.get("name")
      @set('hovering', @content);
      @trigger('delegate.setArrow', @) 

 
    goHere: (act) ->
      console.log("TRANS: " + act)
      if act != undefined
        @transitionToRoute('activities',act)

    hover: (item)->
      console.log "HOVER: " + item
      @set('hovering', item); 
      
    click: (item)->
      console.log "CLICK: " + item
      @set('hovering', item); 
});