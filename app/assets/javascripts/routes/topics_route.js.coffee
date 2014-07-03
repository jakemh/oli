Oli.TopicsRoute = Ember.Route.extend({

  setupController: (controller, model) ->
    controller.set('content', model)

  model: (params) -> 

    course = @modelFor('courses')
    course.get('topics').then (topics) ->
      for t in topics.toArray()
        return t if t.get('name') == params.topic

  afterModel: (topic, transition) -> 
    if (transition.targetName == "topics.index") 
      @transitionTo("activities", "Level 1", "Intro")
});

Oli.TopicsIndexRoute = Oli.TopicsRoute.extend({
});