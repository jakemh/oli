Oli.ActivitiesRoute = Ember.Route.extend Ember.Evented,
  setupController: (controller, model) ->
    controller.set('content', model);
    controller.send('trans', model)
    controller.notifyPropertyChange('hash')
 
  model: (params) -> 
    section = @modelFor('sections')
    section.get('activities').then (activities) ->
      for a in activities.toArray()
        if a.get('name') == params.activity
          return a
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

  renderTemplate: ->

    controllers = {
      "share_2" : @controllerFor('emailForm');
      "choose_word" : @controllerFor('activities')
      "questions_answers" : @controllerFor('questionAnswers')
      "questions_answers_2" : @controllerFor('activities')
      "share_1" : @controllerFor('share1')
      "video" : @controllerFor('video')
      "empty" : @controllerFor('activities')
    }


    activitiesController = @controllerFor('activities');
    newWordController = @controllerFor('newWord');


    template = @modelFor('activities').get('template') || 'empty'
    @render('activities/' + template, {
      outlet: 'template'
      into: 'activity'
      controller: controllers[template] 
      })

    if template == 'choose_word'
      @render('activities/new_word', {
        outlet: 'newWord'
        into: 'activities/choose_word'
        controller: newWordController 
      })

    






