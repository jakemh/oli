Oli.BaseRoute = Ember.Route.extend
  renderTemplate: ->
    @render('nav', {
      outlet: 'nav',
    });
    
    @render('navContentsHome', {
      outlet: 'navContents',
      into: 'nav',
      controller: @controllerFor("me") 
      })
