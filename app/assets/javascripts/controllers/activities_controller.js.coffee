Oli.ActivitiesController = Ember.ObjectController.extend(Ember.Evented,{
  
  needs: ['sections']

  hash: ->
    hash = {}
    
  # activity: @content

  activities:  ((model, obj) ->
    @get('controllers.sections').get('activities')
    ).property('name')

  actions:
    moveArrow: (element) ->
      console.log "MOVE ARROW"
      console.log @content.get("name")
      @set('hovering', @content.get("name"));
      @trigger('delegate.clickedBox', @) 

 
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