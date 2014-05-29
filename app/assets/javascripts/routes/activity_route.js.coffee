Oli.ActivitiesRoute = Ember.Route.extend({
  setupController: (controller, model) ->
    controller.set('content', model);
    controller.send('trans', model)
    controller.notifyPropertyChange('hash')

    model.addObserver "completed", ->
      controller.get('controllers.sections').notifyPropertyChange('sectionDone')

  model: (params) -> 
    section = @modelFor('sections')
    section.get('activities').then (activities) ->
      for a in activities.toArray()
        if a.get('name') == params.activity
          return a

  renderTemplate: ->
    activitiesController = @controllerFor('activities');
    console.log("route: " +  @modelFor('activities').get('name'))
    console.log("route: " +  @modelFor('activities').get('template'))

    template = @modelFor('activities').get('template') || 'empty'
    @render('activities/' + template, {
      outlet: 'template', 
      into: 'activity',
      controller: activitiesController 
      })
    });
