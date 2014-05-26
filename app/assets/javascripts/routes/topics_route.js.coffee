Oli.TopicsRoute = Ember.Route.extend({
  setupController: (controller, model) ->
    console.log("DONE")
    controller.set('content', model)

  model: (params) -> 
    course = @modelFor('course')
    course.get('topics').then (topics) ->
      for t in topics.toArray()
        return t if t.get('name') == params.topic

  afterModel: (topic, transition) -> 
    if (transition.targetName == "topics.index") 
      @transitionTo("activities", "Level 1", "Exercise 1")
});

Oli.TopicsIndexRoute = Ember.Route.extend({
  setupController: (controller, model) ->
    console.log("DONE")
    controller.set('content', model)

  model: (params) -> 
    course = @modelFor('course')
    course.get('topics').then (topics) ->
      for t in topics.toArray()
        return t if t.get('name') == params.topic

  afterModel: (topic, transition) -> 
    if (transition.targetName == "topics.index") 
      @transitionTo("activities", "Level 1", "Exercise 1")
});