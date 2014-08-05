
Oli.ActivityBaseController = Ember.ObjectController.extend Oli.Componentable, Ember.Evented, 
  needs: "activities"

  setup: ->
    @set('finished', @get('activityController.content.completed'))
    @set('controllers.activities.buttonDisabled', !@get('finished'))
    
  finished: false
  submitForm: (callback)->
    callback()

  allowContinue: ->
    @set('controllers.activities.buttonDisabled', false)

  preventContinue: ->
    @set('controllers.activities.buttonDisabled', true)

  activity: (-> 
    @get('controllers.activities.content')
    ).property('controllers.activities.content')

  activityController: (->
    @get('controllers.activities')
    ).property()