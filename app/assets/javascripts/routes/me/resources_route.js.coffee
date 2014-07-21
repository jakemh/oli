Oli.ResourcesRoute = Ember.Route.extend Ember.Evented,
  
  setupController: (controller, model) ->
    me = @get('controller.controllers.me')
    me.set('notchBarContent', 'resources')
    me.send('trans', "resources")

  renderTemplate: ->
    @render('me/resources', {
      into: "me"
    });



  model: ->
    return null