Oli.FreeVideosRoute = Ember.Route.extend Ember.Evented,
  setupController: (controller, model) ->
    @get('controller').set('content', model)
    me = @get('controller.controllers.me')
    me.set('content', "free_videos")
    me.send('trans', "free_videos")

  renderTemplate: ->
    @render('me/free_videos', {
      outlet: "template"
      into: "me"
    });

  afterModel: (model)-> 
    # @transitionTo('free_video', model.id)

  
  model: (params) -> 
    @store.find("activity", {template: "free_video"}).then (videos)->
      return videos
    # @controllerFor('freeVideos').videoByRelativeId(params.id)

  # renderTemplate: ->
  #   @render('freeVideo', {
  #     outlet: 'freeVideo'
  #     controller: @controllerFor('freeVideo')
  #     })