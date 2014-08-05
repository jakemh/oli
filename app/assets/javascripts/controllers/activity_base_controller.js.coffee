Oli.ActivityBaseController = Ember.ObjectController.extend Oli.Componentable, Ember.Evented, 
  needs: "activities"

  setup: ->
 
  finished: false
  submitForm: (callback)->
    callback()

  activity: (-> 
    @get('controllers.activities.content')
    ).property('controllers.activities.content')

  activityController: (->
    @get('controllers.activities')
    ).property()

  dependentActivities: (->
    new Em.RSVP.Promise (resolve, reject) => 
      @get('controllers.activities.dependencies').then (dependents)=>
        resolve dependents
    ).property('controllers.activities.content')