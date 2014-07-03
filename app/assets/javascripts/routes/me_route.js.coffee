Oli.MeRoute = Ember.Route.extend Ember.Evented,

  setupController: (controller, model) ->
    controller.set('content', model)
    controller.send('trans', model)

  childControllers: (->
    "account" : @controllerFor('account')
    "free_videos" : @controllerFor('selectFreeVideos')
    ).property()

  renderTemplate: ->
    @render('nav', {
      outlet: 'nav',
    });
  

    template = @modelFor("me")
    @render('me', {
      outlet: 'me'
      controller: @controllerFor('me')
      })

    @render('me/' + template, {
      outlet: 'template'
      into: 'me'
      controller: @get('childControllers')[template] 
      })

    # @render('account', {
    #   outlet: 'account',
    #   controller: @controllerFor('me') 

    # });

  

  model: (params)->
    return params.location