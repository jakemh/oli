Oli.FreeVideosRoute = Ember.Route.extend Ember.Evented,
  afterModel: (model)-> 
    @transitionTo('free_videos_separate', model.id)

  # renderTemplate: ->
  #   @render('freeVideo', {
  #     outlet: 'freeVideo'
  #     controller: @controllerFor('freeVideo')
  #     })