Oli.Validations = Ember.Mixin.create
  finished: false
  minLength: 3
  needs: ["activities"]

  validationsSetup: (actController) ->
    actController = actController || @get('activityController')
    @set('finished', actController.get('content.completed'))
    actController.set('buttonDisabled', !@get('finished'))

  allowContinue: (actController) ->
    actController = actController || @get('activityController')

    actController.set('buttonDisabled', false)
    if actController.get('content.completed') == false
      act = actController.get('content')
      act.set('completed', true)
      act.set('justCompleted', true)
      act.save()

      @get('controllers.activities').trigger('delegate.increaseProgress', @)
      #increase progress bar 
      @set('finished', true)

  preventContinue: (actController) ->
    actController = actController || @get('activityController')

    actController.set('buttonDisabled', true)
    if actController.get('content.completed') == true
      act = actController.get('content')
      act.set('completed', false)
      act.save()
      @get('controllers.activities').trigger('delegate.decreaseProgress', @)
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

