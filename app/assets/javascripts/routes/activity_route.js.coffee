Oli.ActivitiesRoute = Ember.Route.extend({
  setupController: (controller, model) ->
    controller.set('content', model);
    controller.send('trans', model)

  model: (params) -> 
    section = @modelFor('sections')
    section.get('activities').then (activities) ->
      for a in activities.toArray()
          return a if a.get('name') == params.activity

    });