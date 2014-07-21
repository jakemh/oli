Oli.CourseInfoRoute = Ember.Route.extend Ember.Evented,
  
  setupController: (controller, model) ->
    controller.set('content', model)
    me = @get('controller.controllers.me')
    me.set('notchBarContent', 'course_info')
    me.send('trans', "course_info")

  renderTemplate: ->
    @render('me/course_info', {
      into: "me"
    });



  model: (params) -> 
    user = @modelFor('me')
    user.get('courses').then (courses)->
      return courses.get('firstObject')
    