Oli.CourseInfoRoute = Ember.Route.extend Ember.Evented,
  
  setupController: (controller, model) ->
    me = @get('controller.controllers.me')
    me.set('content', 'course_info')
    me.send('trans', "course_info")

  renderTemplate: ->
    @render('me/course_info', {
      outlet: "template"
      into: "me"
    });



  model: ->
    return null