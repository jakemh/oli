Oli.IndexRoute = Ember.Route.extend({
  model: (param)->

  renderTemplate: ->
    baseController = @controllerFor('base');

    @render('nav', {
      outlet: 'nav',
    });

    @render('navContentsHome', {
      outlet: 'navContents',
      into: 'nav',
      controller: baseController 
    });
      
});