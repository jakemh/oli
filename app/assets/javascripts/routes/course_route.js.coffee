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
      
   
    @render('levels', {
      outlet: 'levels', 
      controller: topicsController 
      })

    @render('bar', {
      outlet: 'bar', 
      controller: activitiesController 
      })

    @render('activityTitle', {
      outlet: 'activityTitle', 
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