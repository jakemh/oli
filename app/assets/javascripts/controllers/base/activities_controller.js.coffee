Oli.ActivitiesController = Ember.ObjectController.extend Ember.Evented, Oli.Componentable,
  
  needs: ['sections']

  progress: null
  status: ""
  template: null
  notchGap: true
  templateName: (->
    "status"
    ).property()

  video: null
  buttonText: "Continue"

  tip: (->
    @content.get('tip')
    ).property("content")

  notchBarContent: (->
    @get('content')
    ).property('content')

  barContent: (->
    @get('activities').map((item, index) ->
      {name: item.get('name'), completed: item.get('completed')}
      )
    ).property('activities')

  boxUpdated: ->
    @trigger('threadUpdater')

  status: (()->
    
  ).property()

  notchBarLength: (->
    @get('activities.length')
    ).property('activities')

  handleDelimeter: ->
    alert("TEST")

  submitForm: (callback) -> 
    callback()
    
  checked: ->
    
  hash: ->
    
    new Em.RSVP.Promise (resolve, reject) =>
      hash = {}
      @get('activities').then (acts)->
        for a, i in acts.toArray()
          hash[a] = (i + 1)
        resolve(hash)

  updateComponents: ->

    @get('components').then (cs)=>
      for c in cs.toArray()
        c.save()

  activities:  ((model, obj) ->
    @get('controllers.sections').get('activities')
    ).property('controllers.sections.activities')
  

  # activities: (->
  #   return DS.PromiseObject.create promise: 
  #     new Em.RSVP.Promise (resolve, reject) =>
  #       @get('controllers.sections').get('activities').then (activities)->
  #         resolve activities.filterProperty("display", true)
  #         # resolve activities
  #   ).property('name')
  
  nextAct: (act) ->
    @hash().then (h)=>
      newActInd = h[act]
      @get('activities').then (acts)=>

        actsArray = acts.toArray()

        if act.get('completed') == false
          @trigger('delegate.increaseProgress', @, ->
            # console.log "COMPLETED"
          ) 
          act.set('completed', true)
          console.log "ACT: " + act
          act.save()
        if newActInd < actsArray.length
          
          newAct = actsArray[newActInd].get('name')
          @transitionToRoute('activities',newAct)
        
        else  
          false
          # @get('controllers.sections').get('sectionDone').then (done)=>

          #   if done

          #     @get('controllers.sections').get('nextLevel')


 
  actions:
    
    updateContent: ->

    # moveArrow: (element) ->
      # @trigger('delegate.setArrow', @) 

    trans: (m)->
      @trigger('delegate.setArrow', @) 

    buttonClicked: (act)->
      if @has('buttonPressed')
        @trigger('buttonPressed', =>
          @nextAct(act)
        )
      else 
        @nextAct(act)

    moveArrow: (element) ->
      console.log "MOVE ARROW"
      console.log @content.get("name")
      @set('hovering', @content);
      # @trigger('delegate.setArrow', @) 

 
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
