Oli.MeIndexRoute = Ember.Route.extend
  afterModel: (model, transition)->
    if transition.targetName == "me.index"
      if model.get('isFree')
        @transitionTo('free_videos')
      else @transitionTo('course_info')

Oli.MeRoute = Ember.Route.extend Ember.Evented,
  
  setupController: (controller, model, queryParams) ->
    controller.set('user', model)
    controller.set('content', model)

  ackController: (->
    @controllerFor('acknowledgement')
    ).property()


  afterModel: (model, transition)->
    if transition.targetName == "me.index"
      if model.get('isFree')
        @transitionTo('free_videos')
      else @transitionTo('course_info')

  renderAckSelection: ->
    @render('me/' + "gratackPrompt", {
      outlet: 'gratackContent'
      into: 'me/gratackContainer'
      controller: @get('ackController')
      })

    @render('me/' + "gratackButtonsYesNo", {
      outlet: 'gratackButton'
      into: 'me/gratackContainer'
      controller: @get('ackController')
      })

   
      
  events:
    acknowledgementButtonPressed: (type)->
      @get('ackController').saveEntry(type).then (response)=>
        @renderAckSelection()
        @get('ackController').set("input", null)
        @controllerFor('resources').notifyPropertyChange('acknowledgements', 'gratitudes')
        @controllerFor('resources').notifyPropertyChange('gratitudes')

    yesButtonPressed: (type)->
      @get('ackController').setContent(type)

   
      @render('me/' + "gratackInput", {
        outlet: 'gratackContent'
        into: 'me/gratackContainer'
        controller: @get('ackController')
        })

      @render('me/' + "gratackButtonsSave", {
        outlet: 'gratackButton'
        into: 'me/gratackContainer'
        controller: @get('ackController')
        })


    noButtonPressed: (type)->
      # @get('ackController').setContent(type)
      if type == "gratitude"
        @get('ackController').setContent("quote")

        @render('me/' + "quote", {
          outlet: 'gratackContainer'
          into: 'me/acknowledgement'
          controller: @get('ackController')
          })


      else
        @get('ackController').setContent("gratitude")

        @render('me/' + "gratackInput", {
          outlet: 'gratackContent'
          into: 'me/gratackContainer'
          controller: @get('ackController')
          })

        @render('me/' + "gratackButtonsSave", {
          outlet: 'gratackButton'
          into: 'me/gratackContainer'
          controller: @get('ackController')
          })

      # this.get('target').render('test', {into: 'me', outlet:'template'});

  renderTemplate: ->
    @render('nav', {
      outlet: 'nav',
    });
    
    @render('navContentsHome', {
      outlet: 'navContents',
      into: 'nav',
      controller: @controllerFor("me") 
      })

    template = @modelFor("me")
    @render('me', {
      outlet: 'me'
      controller: @controllerFor('me')
      })

    @render('me/' + "meCollapse", {
      outlet: 'meCollapse'
      into: 'me'
      controller: @controllerFor("meCollapse")
      })

    @get('ackController').setContent("acknowledgement")

    @render('me/' + "acknowledgement", {
      outlet: 'contentCollapse'
      into: 'me/meCollapse'
      controller: @get('ackController')
      })

    @render('me/' + "gratackContainer", {
      outlet: 'gratackContainer'
      into: 'me/acknowledgement'
      controller: @get('ackController')
      })

    @render('me/' + "gratackInput", {
      outlet: 'gratackContent'
      into: 'me/gratackContainer'
      controller: @get('ackController')
      })

    @render('me/' + "gratackButtonsSave", {
      outlet: 'gratackButton'
      into: 'me/gratackContainer'
      controller: @get('ackController')
      })


  

  model: (params)->
    @store.find('user').then (user)->
      user.get('firstObject')

