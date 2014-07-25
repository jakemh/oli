Oli.FreeVideoView = Ember.View.extend
  didInsertElement: ->

  reload: (->
    @rerender()
    $("#my-video").load()
    ).observes("controller.source")