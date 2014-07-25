Oli.FreeVideoRoute = Ember.Route.extend({
  setupController: (controller, model) ->
    controller.set('content', model)
  
  beforeModel: ->

  renderTemplate: ->
    freeVideoController = @controllerFor('freeVideo');
    baseController = @controllerFor('base');

  

    # @render('navContents', {
    #   outlet: 'navContents',
    #   into: 'nav',
    #   controller: baseController 
    # });
      
    @render('freeVideo', {
      outlet: 'appContent',
      controller: freeVideoController
    });

    @render('activityTitle', {
      outlet: 'activityTitle',
      into: 'freeVideo'
      controller: freeVideoController
    });
    
  

  model: (params) -> 
    @controllerFor('me.freeVideos').videoByRelativeId(params.id)

  actions: 
    willTransition: ->
      c = @controllerFor('freeVideo');
      # video.js require video to be disposed between transitions
      if c.get('video')
        c.get('video').dispose()
        c.set('video', null)
        
    didTransition: ->
      # alert "TEST"
});