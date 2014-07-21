Oli.WelcomeRoute = Ember.Route.extend({
  setupController: (controller, model) ->
  
  afterModel: (model, transition)->
    # if transition.targetName == "welcome.index"
    #   @transitionTo('free_videos_separate', 1)

  renderTemplate: ->
    # freeVideosController = @controllerFor('freeVideos');
    baseController = @controllerFor('base');

    @render('nav', {
      outlet: 'nav',
    });

    @render('navContentsHome', {
      outlet: 'navContents',
      into: 'nav',
      controller: baseController 
    });
      
    # @render('freeVideo', {
    #   outlet: 'freeVideo',
    #   controller: freeVideosController
    # });
    
  actions:
    willTransition: ->
      alert "welcomeroute"

  
  model: (params) -> 

});