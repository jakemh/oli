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
  activeChild: null

  errors: (->
    @get('activeChild.errors')
    ).property('content')

  title: (->
    @content. get('name')
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

  updateProgress: (context)->
    if context.get('content.completed') == true
      context.trigger('delegate.increaseProgress', @)
    else
      context.trigger('delegate.decreaseProgress', @)

  # activityStatusChanged: (->
  #   if @get('content.completed') == true
  #     @trigger('delegate.increaseProgress', @)
  #   else
  #     @trigger('delegate.decreaseProgress', @)
  #   ).observes('completed')

  buttonDisabled: false

  boxUpdated: ->
    @trigger('threadUpdater')

  status: (()->
    
  ).property()

  notchBarLength: (->
    @get('activities.length')
    ).property('activities')

  handleDelimeter: ->
    # alert("TEST")

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

  validationSuccess: (act)->
    @hash().then (h) =>
      newActInd = h[act]
      @get('activities').then (acts) =>

        actsArray = acts.toArray()
        if act.get('justCompleted') == true
          # displayToast()
          act.set('justCompleted', false)
        if newActInd < actsArray.length
          newAct = actsArray[newActInd].get('name')
          @transitionToRoute('activities', newAct)
        else  
          @get('controllers.sections').get('nextLevel')

  validationFail: (act)->
    $("#status-modal").modal()
      # initModalHeight = $(".modal-dialog").outerHeight() #give an id to .mobile-dialog
      # userScreenHeight = $(document).outerHeight()
      # if initModalHeight > userScreenHeight
      #   $(".modal-dialog").css "overflow", "auto" #set to overflow if no fit
      # else
      #   $(".modal-dialog").css "margin-top", (userScreenHeight / 2) - (initModalHeight / 2) #center it if it does fit
      # return
      # )
   
  nextAct: (act) ->
    @validationCheck(
      @validationSuccess, 
       @validationFail
    )
 
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
        @transitionToRoute('activities', act)

    hover: (item)->
      console.log "HOVER: " + item
      @set('hovering', item); 
      
    click: (item)->
      console.log "CLICK: " + item
      @set('hovering', item); 
