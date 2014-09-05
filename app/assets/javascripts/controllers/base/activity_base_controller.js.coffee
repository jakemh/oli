
Oli.ActivityBaseController = Ember.ObjectController.extend Oli.Componentable, Oli.Validations, Ember.Evented,  
  needs: "activities"

  setup: ->
    @validationsSetup()
    
  submitForm: (callback)->
    callback()


  activity: (-> 
    @get('controllers.activities.content')
    ).property('controllers.activities.content')

  activityController: (->
    @get('controllers.activities')
    ).property()