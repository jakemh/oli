Oli.CoursesRoute = Ember.Route.extend({
  setupController: (controller, model) ->
    console.log("MODEL: " + model)
    controller.set('content', model)
    

  renderTemplate: ->
    navController = @controllerFor('topics');
    sectionsController = @controllerFor('sections');
    activitiesController = @controllerFor('activities');
    topicsController = @controllerFor('topics');
    courseController = @controllerFor('courses');
    tipsController = @controllerFor('tips');

    @render('nav', {
      outlet: 'nav',
    });

    @render('navContents', {
      outlet: 'navContents',
      into: 'nav',
      controller: courseController 

    });
      
   

   
    @render('activity', {
      outlet: 'appContent', 
      controller: activitiesController 
      })

    @render('activityTitle', {
      outlet: 'activityTitle', 
      into: 'activity'
      controller: activitiesController 
      })

    @render('status', {
      outlet: 'status', 
      into: 'activity',

      controller: activitiesController 
      })
   

    @render('levels', {
      outlet: 'levels', 
      into: 'activity',
      controller: topicsController 
      })

    @render('bar', {
      outlet: 'bar', 
      into: 'activity',
      controller: activitiesController 
      })
    @render('tip', {
      outlet: 'tip', 

      controller: activitiesController 
      })

  afterModel: (course, transition) -> 
    if (transition.targetName == "course.index") 
      @transitionTo("activities", "Values", "Level 1", "Intro")
      
  model: (params) -> 
    course = @store.find('course', params.id)
});