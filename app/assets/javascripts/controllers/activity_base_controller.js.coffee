Oli.ActivityBaseController = Ember.ObjectController.extend Oli.Componentable,
  needs: "activities"

  setup: ->

  submitForm: (callback)->
    callback()

  activity: (-> 
    @get('controllers.activities.content')
    ).property('controllers.activities.content')

  activityController: (->
    @get('controllers.activities')
    ).property()


