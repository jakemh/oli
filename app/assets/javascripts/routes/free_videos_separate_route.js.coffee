Oli.FreeVideosSeparateRoute = Ember.Route.extend({
  setupController: (controller, model) ->
  
  renderTemplate: ->
    freeVideoController = @controllerFor('freeVideo');
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
      controller: freeVideoController
    });

    
  
  model: (params) -> 

});