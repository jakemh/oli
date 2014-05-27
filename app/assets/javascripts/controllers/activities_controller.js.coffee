Oli.ActivitiesController = Ember.ObjectController.extend(Ember.Evented,{
  
  needs: ['sections']

  init: ->

  trans: (m)->
    @trigger('delegate.setArrow', @) 

  progress: null
  sectionsPerSection: [9,10,10]

  hash: (() ->
    
    hash = {}
    @get('activities').then (acts)->
      for a, i in acts.toArray()
        hash[a] = (i + 1)
      return hash
    ).property()

  # activity: @content

  activities:  ((model, obj) ->
    @get('controllers.sections').get('activities')
    ).property('name')

  actions:
    nextAct: (act) ->
      @get('hash').then (h)=>
        newActInd = h[act]
        @get('activities').then (acts)=>

          newAct = acts.toArray()[newActInd].get('name')
          @transitionToRoute('activities',newAct)
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