
Oli.ActivityBaseController = Ember.ObjectController.extend Oli.Componentable, Ember.Evented, Oli.Validations, 
  needs: "activities"

  setup: ->
    # @set('validations', @get('activity.validations'))
    # @get('validations').validationsSetup()
    
  submitForm: (callback)->
    callback()

  validations: null
  activity: (-> 
    @get('controllers.activities.content')
    ).property('controllers.activities.content')

  activityController: (->

    @get('controllers.activities')
    ).property()