Oli.SectionsRoute = Ember.Route.extend({
  setupController: (controller, model) ->
    controller.set('content', model);

  afterModel: (topic, transition) -> 
    console.log("TRANS: " + transition)
    if (transition.targetName == "sections.index") 
      @transitionTo("activities", "Start")

  model: (params) -> 
    topic = @modelFor('topics')
    topic.get('sections').then (sections) ->
      for s in sections.toArray()
          return s if s.get('name') == params.section
    });

Oli.SectionsIndexRoute = Ember.Route.extend({
  setupController: (controller, model) ->
    controller.set('content', model);

  afterModel: (topic, transition) -> 
    console.log("TRANS: " + transition)
    if (transition.targetName == "sections.index") 
      @transitionTo("activities", "Start")

  model: (params) -> 
    topic = @modelFor('topics')
    topic.get('sections').then (sections) ->
      for s in sections.toArray()
          return s if s.get('name') == params.section
    });