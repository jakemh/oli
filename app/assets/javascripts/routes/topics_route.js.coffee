Oli.TopicsRoute = Ember.Route.extend({

  setupController: (controller, model) ->
    # controller.set('content', model)

  model: (params) -> 
    course = @modelFor('courses')
    course.get('topics').then (topics) ->
      for t in topics.toArray()
        if t.get('name') == params.topic
          return t 

  afterModel: (topic, transition) -> 
    @controllerFor('topics').set('content', topic)
    if (transition.targetName == "topics.index") 
      @transitionTo("activities", "Level 1", "Intro")
});

Oli.TopicsIndexRoute = Oli.TopicsRoute.extend({
});