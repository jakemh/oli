Oli.Validations = Ember.Mixin.create
  finished: false
  minLength: 3
  needs: ["activities"]
  passedValidation: null
  errors: []

  registerErrors: (callback) ->
    @set('errors', [])
    @get('errors').push(callback())

  boxErrorName: (index)->
    "box" + index + "Error"

  validationFail: ->


  validationCheck: (success, fail) ->
    act = @get('content')

    if act.get('completed') == true
      success.call(@, @get('content'))
    else
      fail.call(@, @get('content'))

  # validationsSetup: (actController) ->
    # actController = actController || @get('activityController')
    # @set('finished', actController.get('content.completed'))
    # actController.set('buttonDisabled', !@get('finished'))
    # @set("passedValidation", @get('finished'))
  validateInput: (input, options = {}) ->
    minLength = options.minLength ? options.minLength || @minLength
    if input && input.length >= minLength
      true
    else 
      false

  registeredInputs: []
  validateInputs: (callback, inputs) ->
    a = []
    _inputs = @registeredInputs
    # alert JSON.stringify _inputs
    for input in _inputs 
      v = null
      if input.reference
        v = input.value 
      else v = @get(input.value)
      value = @validateInput(v)
      # alert JSON.stringify input
      # alert input.container + " " + !value
      @set(input.container, !value)
      callback(value)

  # validate: ->
  #   throw new error("YOU MUST OVERRIDE THIS")
  registerInputs: (callback, opt = {}) ->
    @registeredInputs = []
    for input, i in callback()
      name = @boxErrorName(i + 1)
      #add var to model
      if @[name] == undefined
        @[name] = false
      else 
        @set(name, false)

      reference = null
      if opt.array
        reference = true
      else reference = false

      @registeredInputs.push({value: input, container: name, reference: reference})

      if !opt.array
        @addObserver(input, @, @validate) if !@hasObserverFor(input)

    if opt.array
      @addObserver(opt.array, @, @validate) if !@hasObserverFor(opt.array)
    
    #initial validation
    @validate()

  allowContinue: (actController) ->

    actController = actController || @get('activityController')
    act = actController.get('content')

    # actController.set('buttonDisabled', false)
    @set("passedValidation", true)
    if act.get('completed') == false
      # alert "ALLOW"

      act.set('completed', true)
      act.set('justCompleted', true)
      act.save()

      # @get('controllers.activities').trigger('delegate.increaseProgress', @)
      #increase progress bar 
      # @set('finished', true)

  preventContinue: (actController) ->
    actController = actController || @get('activityController')

    # actController.set('buttonDisabled', true)
    @set("passedValidation", false)

    if actController.get('content.completed') == true
      # alert "PREVENT"
      act = actController.get('content')
      act.set('completed', false)
      act.save()
      # @get('controllers.activities').trigger('delegate.decreaseProgress', @)
      #decrease progress bar 
      @set('finished', false)

  handleValidationTransition: (sectionName) -> 
    $("#sectionsModal").modal()
    setTimeout (=>
      @transitionTo('sections', sectionName)
    ), 2000

  sectionReady: (controller, model) ->
    new Em.RSVP.Promise (resolve, reject) =>
      controller.sectionsHash().then (hash) =>
        sectionID = hash[model]
        if sectionID == 1
          resolve {success: true, sectionID: sectionID}
        else      
          previousSectionID = Math.max(0,sectionID - 2)
          section = controller.get('sections').objectAt(previousSectionID)
          section.get('activities').then (activities) =>
            for act in activities.toArray()
              if !act.get('completed')
                resolve {success: false, sectionID: sectionID}
              resolve {success: true, sectionID: sectionID}

