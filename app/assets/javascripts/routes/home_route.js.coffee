Oli.HomeRoute = Ember.Route.extend Ember.Evented,



  renderTemplate: ->
    @render('nav', {
      outlet: 'nav',
    });
    @render('home', {
      outlet: "home"
    });

    debugger