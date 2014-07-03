Oli.WelcomeRoute = Ember.Route.extend({
  setupController: (controller, model) ->
  
  afterModel: ()->
    @transitionTo('free_videos')

  renderTemplate: ->
    freeVideosController = @controllerFor('freeVideos');
    baseController = @controllerFor('base');

    @render('nav', {
      outlet: 'nav',
    });

    @render('navContents', {
      outlet: 'navContents',
      into: 'nav',
      controller: baseController 
    });
      
    @render('freeVideo', {
      outlet: 'freeVideo',
      controller: freeVideosController
    });


  
  model: (params) -> 

});