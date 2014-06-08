Oli.CourseRoute = Ember.Route.extend({
  setupController: (controller, model) ->
    console.log("MODEL: " + model)
    controller.set('content', model)
    @store.findById('topic', 1).then (t)->
      t.get('sections').then ()->

  renderTemplate: ->
    navController = @controllerFor('topics');
    sectionsController = @controllerFor('sections');
    activitiesController = @controllerFor('activities');
    topicsController = @controllerFor('topics');
    courseController = @controllerFor('course');

    @render('nav', {
      outlet: 'nav',
      controller: courseController
    });
      
    @render('levels', {
      outlet: 'levels', 
      controller: topicsController 
      })

    @render('bar', {
      outlet: 'bar', 
      controller: activitiesController 
      })

    @render('activity', {
      outlet: 'activity', 
      controller: activitiesController 
      })

    @render('status', {
      outlet: 'status', 
      into: 'activity',

      controller: activitiesController 
      })

  afterModel: (course, transition) -> 
    if (transition.targetName == "course.index") 
      @transitionTo("activities", "Values", "Level 1", "Intro")
      
  model: (params) -> 
    course = @store.find('course', params.id)
});