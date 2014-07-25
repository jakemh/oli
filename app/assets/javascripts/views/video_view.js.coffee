Oli.VideoView = Em.View.extend Oli.AnimatedView,

  didInsertElement: ->
    # videoID = "videoclip"
    # sourceID = "mp4video"
    # newmp4 = "/videos/free_video_3.mp4"
    # newposter = "media/video-poster2.jpg"
    # $("#videolink1").click (event) ->
    #   $("#" + videoID).get(0).pause()
    #   $("#" + sourceID).attr "src", newmp4
    #   $("#" + videoID).get(0).load()
     
    #  #$('#'+videoID).attr('poster', newposter); //Change video poster
    #   $("#" + videoID).get(0).play()
    #   return

    # alert "TeST"
    player = videojs(document.getElementsByClassName('video-js')[0], { "controls": true, "autoplay":false, "preload": "auto" }, ->
      $('#my_video').load()

    )
    @get('controller').handleVideoDispose(player)


  autoplay: false
  preload: "none"
  rerenderView: (->
    @rerender()
    ).observes("controller.source").on("init")
  
  hideButton: ->
    @get('controller.hideButton')

  controlsOn: ->
    if @controller.get('controlsOn') != undefined
      @controller.get('controlsOn')
    else true 

  

    
    # @set('controller.controllers.activities.video', player)
    # @set('controller.controllers.activities.status', "")
