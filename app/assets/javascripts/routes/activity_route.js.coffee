Oli.ActivitiesRoute = Ember.Route.extend({
  setupController: (controller, model) ->
    controller.set('content', model);

  model: (params) -> 
    section = @modelFor('sections')
    section.get('activities').then (activities) ->
      for a in activities.toArray()
          return a if a.get('name') == params.activity

    });