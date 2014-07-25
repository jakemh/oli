Oli.VideoView = Em.View.extend Oli.AnimatedView,

  didInsertElement: ->
    # @get('controller').on('setup', @, )
    player = videojs("MY_VIDEO_1", { "controls": true, "autoplay": @get('autoplay'), "preload": @get('preload') }, ->
    )

    @get('controller').handleVideoDispose(player)

  autoplay: false
  preload: "none"
  rerenderView: (->
    @rerender()
    ).observes("source")
  
  hideButton: ->
    @get('controller.hideButton')

  controlsOn: ->
    if @controller.get('controlsOn') != undefined
      @controller.get('controlsOn')
    else true 

  

    
    # @set('controller.controllers.activities.video', player)
    # @set('controller.controllers.activities.status', "")
