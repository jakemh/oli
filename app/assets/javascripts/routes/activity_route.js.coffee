Oli.ActivitiesRoute = Ember.Route.extend({
  setupController: (controller, model) ->
    controller.set('content', model);
    # controller.set('video', "TEST")
    controller.send('trans', model)
    controller.notifyPropertyChange('hash')
    model.addObserver "completed", ->
      controller.get('controllers.sections').notifyPropertyChange('sectionDone')

  model: (params) -> 
    section = @modelFor('sections')
    section.get('activities').then (activities) ->
      for a in activities.toArray()
        if a.get('name') == params.activity
          return a
  actions: 
    willTransition: ->
      @get('controller').notifyPropertyChange('components')

      # video.js require video to be disposed between transitions
      if @get('controller').get('video')
        @get('controller').get('video').dispose()

  renderTemplate: ->

    controllers = {
      "share_2" : @controllerFor('emailForm');
      "choose_word" : @controllerFor('activities')
      "questions_answers" : @controllerFor('activities')
      "questions_answers_2" : @controllerFor('activities')
      "share_1" : @controllerFor('activities')
      "video" : @controllerFor('activities')
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
      })


    






