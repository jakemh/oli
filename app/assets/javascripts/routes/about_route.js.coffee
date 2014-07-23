Oli.FirstLoginRoute = Ember.Route.extend

  actions: 
    didTransition: ->
      @transitionTo('me')

  renderTemplate: ->
    @render('first_login', {
      into: "me"
    });


Oli.AboutRoute = Ember.Route.extend
  renderTemplate: ->
    @render('nav', {
      outlet: 'nav',
    });
    
    @render('navContentsHome', {
      outlet: 'navContents',
      into: 'nav',
      controller: @controllerFor("base") 
      })

Oli.PricingRoute = Ember.Route.extend
  renderTemplate: ->
    @render('nav', {
      outlet: 'nav',
    });
    
    @render('navContentsHome', {
      outlet: 'navContents',
      into: 'nav',
      controller: @controllerFor("base") 
      })

Oli.BlogRoute = Ember.Route.extend
  renderTemplate: ->
    @render('nav', {
      outlet: 'nav',
    });
    
    @render('navContentsHome', {
      outlet: 'navContents',
      into: 'nav',
      controller: @controllerFor("base") 
      })

Oli.ContactRoute = Ember.Route.extend
  renderTemplate: ->
    @render('nav', {
      outlet: 'nav',
    });
    
    @render('navContentsHome', {
      outlet: 'navContents',
      into: 'nav',
      controller: @controllerFor("base") 
      })

