Oli.AccountRoute = Ember.Route.extend Ember.Evented,
  
  setupController: (controller, model) ->
    me = @get('controller.controllers.me')
    me.set('notchBarContent', 'account')
    me.send('trans', "account")

  renderTemplate: ->
    @render('me/account', {
      into: "me"
    });



  model: ->
    return null