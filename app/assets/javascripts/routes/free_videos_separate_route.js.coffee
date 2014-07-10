Oli.FreeVideoRoute = Ember.Route.extend({
  setupController: (controller, model) ->
    controller.set('content', model)
    
  renderTemplate: ->
    freeVideoController = @controllerFor('freeVideo');
    baseController = @controllerFor('base');

  

    # @render('navContents', {
    #   outlet: 'navContents',
    #   into: 'nav',
    #   controller: baseController 
    # });
      
    @render('freeVideo', {
      outlet: 'freeVideo',
      controller: freeVideoController
    });
  

  model: (params) -> 
    @controllerFor('freeVideos').videoByRelativeId(params.id)

  actions: 
    willTransition: ->
      c = @controllerFor('freeVideo');
      # video.js require video to be disposed between transitions
      if c.get('video')
        c.get('video').dispose()
        c.set('video', null)
});