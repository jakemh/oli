Oli.VideoView = Em.View.extend
  didInsertElement: ->

    player = videojs("MY_VIDEO_1", { "controls": true, "autoplay": false, "preload": "none" }, ->
    )

    @set('controller.controllers.activities.video', player)
    @set('controller.controllers.activities.status', "")
