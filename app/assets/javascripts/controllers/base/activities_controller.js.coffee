Oli.ActivitiesController = Ember.ObjectController.extend Ember.Evented, Oli.Componentable, Oli.Validations,
  
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

  title: (->
    @content.get('name')
    ).property("content")

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

  buttonDisabled: false

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
  previousAct: (act) ->
    @hash().then (h)=>
      newActInd = h[act] - 2
      if newActInd >= 0
        @get('activities').then (acts)=>
          actsArray = acts.toArray()

          newAct = actsArray[newActInd].get('name')
          @transitionToRoute('activities',newAct)

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
          act.save()
        if newActInd < actsArray.length
          
          newAct = actsArray[newActInd].get('name')
          @transitionToRouteAnimated('activities', main: 'slowSlideLeft', newAct)
        
        else  
          # false
          # @get('controllers.sections').get('sectionDone').then (done)=>

          #   if done

          #     @get('controllers.sections').get('nextLevel')
          @get('controllers.sections').get('nextLevel')

 
  actions:
    skipActivity: (act)->
      @allowContinue(@)
      @nextAct(act)


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

    backButtonClicked: (act)->
      if @has('buttonPressed')
        @trigger('buttonPressed', =>
          @previousAct(act)
        )
      else 
        @previousAct(act)

    moveArrow: (element) ->
      console.log "MOVE ARROW"
      console.log @content.get("name")
      @set('hovering', @content);
      # @trigger('delegate.setArrow', @) 

 
    goHere: (act) ->
      if act != undefined
        @transitionToRouteAnimated('activities', main: 'slideLeft', act)

    hover: (item)->
      console.log "HOVER: " + item
      @set('hovering', item); 
      
    click: (item)->
      console.log "CLICK: " + item
      @set('hovering', item); 
