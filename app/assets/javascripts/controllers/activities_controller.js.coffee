Oli.ActivitiesController = Ember.ObjectController.extend(Ember.Evented,{
  
  needs: ['sections']

  init: ->

  

  progress: null
  sectionsPerSection: [10,10,10]

  hash: (() ->
    
    console.log "HASH ACTIVITIES0: "

    hash = {}
    @get('activities').then (acts)->
      console.log "HASH ACTIVITIES: " + acts

      for a, i in acts.toArray()
        hash[a] = (i + 1)
      return hash
    ).property()

  # activity: @content

  activities:  ((model, obj) ->
    @get('controllers.sections').get('activities')
    ).property('name')

  actions:
    moveArrow: (element) ->
      @trigger('delegate.setArrow', @) 
    

    trans: (m)->
      @trigger('delegate.setArrow', @) 

    nextAct: (act) ->

      @get('hash').then (h)=>
        newActInd = h[act]
        @get('activities').then (acts)=>
          actsArray = acts.toArray()
          console.log "newActInd: " + newActInd
          console.log "actsArrayL: " + actsArray.length

          if newActInd < actsArray.length
            
            newAct = actsArray[newActInd].get('name')
            @transitionToRoute('activities',newAct)
          
          else  
            @notifyPropertyChange('hash')
            console.log "NEXT LEVEL"

            @get('controllers.sections').get('nextLevel')
          
          if act.get('completed') == false
            @trigger('delegate.increaseProgress', @) 
            act.set('completed', true)


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