Oli.ActivitiesRoute = Ember.Route.extend Ember.Evented,
  setupController: (controller, model) ->
    controller.set('content', model);
    controller.send('trans', model)

    # controller.notifyPropertyChange('hash')
    controller.set('template', @template())
    @get('childControllers')[@template()].setup()

  model: (params) -> 
    section = @modelFor('sections')
    # alert "MODEL " +  section.get('activities')
    section.get('activities').then (activities) ->
      for a in activities.toArray()
        if a.get('name') == params.activity
          return a

  childControllers: (->
    "share_2" : @controllerFor('emailForm')
    "choose_word" : @controllerFor('activities')
    "questions_answers" : @controllerFor('questionAnswers')
    "questions_values" : @controllerFor('answersValues')
    "word_thread" : @controllerFor('wordThread')
    "share_1" : @controllerFor('share1')
    "video" : @controllerFor('video')
    "empty" : @controllerFor('activities')
    "thread_rating" : @controllerFor('threadRatings')
    "describe_a_10" : @controllerFor('describeA10')
    "calendar" : @controllerFor('takeAction')
    "brainstorm" : @controllerFor('brainstorm')
    
    ).property()

  template: ->
    template = @modelFor('activities').get('template') || 'empty'
  
  actions: 
    willTransition: ->
      
      #setting some defaults
      @get('controller').set("buttonText", "Continue")
      @get('controller').off("buttonPressed")
      @get('controller').set("status", "")
      @get('controller').set("templateName", "status")

      # video.js require video to be disposed between transitions
      if @get('controller.video')
        @get('controller.video').dispose()
        @set('controller.video', null)

    didTransition: -> 
      # if @modelFor("activities").get('display') == false
      #   @get('controller').hash()
      # bind submit form action to button for child controllers
      childController = @get('childControllers')[@get('controller.content.template')]
      @get('controller').on("buttonPressed", childController, childController.submitForm)


  renderTemplate: ->
    childControllers = @get('childControllers')
    activitiesController = @controllerFor('activities');
    newWordController = @controllerFor('newWord');

    template = @template()
    @render('activities/' + template, {
      into: 'activity'
      controller: childControllers[template] 
      })

    if template == 'choose_word'
      @render('activities/new_word', {
        outlet: 'newWord'
        into: 'activities/choose_word'
        controller: newWordController 
      })

    






