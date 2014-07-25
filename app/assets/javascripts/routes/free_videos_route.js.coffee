Oli.MeFreeVideosRoute = Ember.Route.extend Ember.Evented,
  setupController: (controller, model) ->
    @get('controller').set('content', model)
    me = @get('controller.controllers.me')
    me.set('notchBarContent', "free_videos")
    me.send('trans', "free_videos")

  beforeModel: ->
    # alert "TEST"

  renderTemplate: ->
    @render('me/free_videos',
      into: "me"
    );

  afterModel: (model)-> 
    # @transitionTo('free_video', model.id)

  actions: 
    willTransition: (trans)->
      @refresh()
      # alert JSON.stringify trans.targetName

  model: (params) -> 
    @store.find("activity", {template: "free_video"}).then (videos)->
      return videos
    # @controllerFor('freeVideos').videoByRelativeId(params.id)

  # renderTemplate: ->
  #   @render('freeVideo', {
  #     outlet: 'freeVideo'
  #     controller: @controllerFor('freeVideo')
  #     })