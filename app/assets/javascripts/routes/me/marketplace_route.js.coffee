Oli.MarketplaceRoute = Ember.Route.extend Ember.Evented,
  
  setupController: (controller, model) ->
    me = @get('controller.controllers.me')
    me.set('content', 'marketplace')
    me.send('trans', "marketplace")

  renderTemplate: ->
    @render('me/marketplace', {
      outlet: "template"
      into: "me"
    });



  model: ->
    return null