Oli.ActivitiesController = Ember.ObjectController.extend(Ember.Evented,{
  
  needs: ['sections']

  trans: (m)->
    @trigger('delegate.setArrow', @) 


  hash: (() ->
    
    hash = {}
    @get('activities').then (acts)->
      for a, i in acts.toArray()
        hash[a.get('name')] = (i + 1)
      return hash
    ).property()

  # activity: @content

  activities:  ((model, obj) ->
    @get('controllers.sections').get('activities')
    ).property('name')

  actions:

    nextAct: (act) ->
      @get('hash').then (h)=>
        console.log "VAL: " + h[act.get('name')]
        newActInd = h[act.get('name')]
        @get('activities').then (acts)=>
          newAct = acts.toArray()[newActInd].get('name')
          @transitionToRoute('activities',newAct)

    moveArrow: (element) ->
      console.log "MOVE ARROW"
      console.log @content.get("name")
      @set('hovering', @content.get("name"));
      @trigger('delegate.setArrow', @) 

 
    goHere: (act) ->
      console.log("TRANS: " + act)
      if act != undefined
        @transitionToRoute('activities',act)

    hover: (item)->
      console.log "HOVER: " + item
      @set('hovering', item.get('name')); 
      
    click: (item)->
      console.log "CLICK: " + item
      @set('hovering', item.get('name')); 
});