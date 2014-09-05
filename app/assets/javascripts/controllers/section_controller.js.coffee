Oli.SectionsController = Ember.ObjectController.extend(Ember.Evented, {
  needs: "topics"

  # @deprecated
  hash: (() ->
    console.warn("Calling deprecated sections hash function!"); 
    hash = {}
    @get('sections').then (sects)->
      console.log "UPDATE SECT HASH"
      for s, i in sects.toArray()
        hash[s.get('name')] = (i + 1)
      return hash
    ).property('content')

  sectionsHash: ->      
    new Em.RSVP.Promise (resolve, reject) =>
      hash = {}
      @get('sections').then (sects)->
        for s, i in sects.toArray()
          hash[s] = (i + 1)
        resolve(hash)

  section: null
  aps: []


  activitiesPerSection: ((key, value) ->
    return new Ember.RSVP.Promise (resolve, reject)=>
      @get('sections').then (sections)->
        array = new Array(sections.get('length'))
        iteration = 0
        for s,i in sections.toArray()
          do (i)->
            s.get('activities').then (activities)->
              count = 0
              for act in activities.toArray()
                if act.get('completed')
                  count += 1
              array[i] = {length: activities.get('length'), completed: count}
              iteration += 1
              if iteration == sections.get('length')
                resolve(array)

  ).property()

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

  
  # sections: (() ->
  #   @get('controllers.topics').get('sections')
  #   ).property()

  sections: (->
    # @get('controllers.topics').sections()
    @get('controllers.topics').get('sections')

    ).property('content')

  nextLevel: (() ->
    @get('hash').then (h) =>
      ind = h[@content.get('name')]
      @get('sections').then (s) =>
        if ind < s.get('length')
          @transitionToRoute('sections', s.toArray()[ind].get('name'))
          @content.set('ready', true)
    ).property('name')
  
});