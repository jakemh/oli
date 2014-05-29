Oli.SectionsController = Ember.ObjectController.extend(Ember.Evented, {
  needs: "topics"

  hash: (() ->
   
    hash = {}
    @get('sections').then (sects)->
      console.log "UPDATE SECT HASH"
      for s, i in sects.toArray()
        hash[s.get('name')] = (i + 1)
      return hash
    ).property('content')


  activities:  ((model, obj) ->
    @content.get('activities')

    ).property('name')

  sectionDone: ((sectionName) -> 
    console.log "UPDATE SECTION DONE"
    @get('activities').then (acts) ->
      for a in acts.toArray()
        return false if a.get('completed') == false
      return true
    ).property()

  actions:
    goHere: (act) ->
      @transitionToRoute('activities',act)

    hover: (item)->
      @set('hovering', item); 
      
    click: (item)->
      @set('clicking', item); 
  



  sections: (() ->
    @get('controllers.topics').get('sections')
    ).property()

  nextLevel: (() ->
    @get('hash').then (h) =>
      ind = h[@content.get('name')]
      @get('sections').then (s) =>
        @transitionToRoute('activities', s.toArray()[ind].get('name'), "Start")
        @content.set('ready', true)
    ).property('name')
  
});