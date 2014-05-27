Oli.SectionsController = Ember.ObjectController.extend(Ember.Evented, {
  needs: "topics"
  actions:
    goHere: (act) ->
      @transitionToRoute('activities',act)

    hover: (item)->
      @set('hovering', item); 
      
    click: (item)->
      @set('clicking', item); 
  
  hash: (() ->
    
    hash = {}
    @get('sections').then (sects)->
      for s, i in sects.toArray()
        hash[s] = (i + 1)
      return hash
    ).property()

  activities:  ((model, obj) ->
    @content.get('activities')

    ).property('name')

  sections: (() ->
    @get('controllers.topics').get('sections')
    ).property()

  nextLevel: (() ->
    @get('hash').then (h) =>
      ind = h[@content]
      @get('sections').then (s) =>
        console.log "TESTING: " + s.toArray()[ind]
        @transitionToRoute('activities', s.toArray()[ind].get('name'), "Start")

    ).property('name')
  
});