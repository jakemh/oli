Oli.TopicsRoute = Ember.Route.extend({
  setupController: (controller, model) ->
    controller.set('content', model)

    # set first to ready 
    controller.store.getById('section', 1).set('ready', true)
    # controller.get('sections').then (sects)->
    #   sects.toArray()[0].set('ready', true)

  model: (params) -> 
    course = @modelFor('course')
    course.get('topics').then (topics) ->
      for t in topics.toArray()
        return t if t.get('name') == params.topic

  afterModel: (topic, transition) -> 
    if (transition.targetName == "topics.index") 
      @transitionTo("activities", "Level 1", "Start")
});

Oli.TopicsIndexRoute = Oli.TopicsRoute.extend({
});