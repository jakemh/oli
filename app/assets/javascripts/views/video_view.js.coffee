Oli.VideoView = Em.View.extend Oli.AnimatedView,

  didInsertElement: ->
    videoID = "my_video"
    sourceID = "my_source"
    newmp4 = "/videos/free_video_3.mp4"
    newposter = "media/video-poster2.jpg"
    # $("#videolink1").click (event) ->
    #   $("#" + videoID).get(0).pause()
    #   $("#" + sourceID).attr "src", newmp4
    #   $("#" + videoID).get(0).load()
     
    #  #$('#'+videoID).attr('poster', newposter); //Change video poster
    #   $("#" + videoID).get(0).play()
    #   return

    # # alert "TeST"
    outer = this

  # srcUpdated: (->
  #   # alert @get('controller.sourceAttr')

  #   if @get('controller.sourceAttr')
  #       alert $("#vimeoplayer").attr('src')
  #       $ ->
  #         # When the player is ready, add listeners for pause, finish, and playProgress
          
  #         # Call the API when a button is pressed
  #         iframe = $("#vimeoplayer")[0]
  #         # alert iframe

  #         player = $f(iframe)
  #         onPause = (id) ->
  #           status.text "paused"
  #           return
  #         onFinish = (id) ->
  #           status.text "finished"
  #           return
  #         onPlayProgress = (data, id) ->
  #           status.text data.seconds + "s played"
  #           return

  #         status = $(".status")
  #         player.addEvent "ready", ->
  #           status.text "ready"
  #           player.addEvent "pause", onPause
  #           player.addEvent "finish", onFinish
  #           player.addEvent "playProgress", onPlayProgress
  #           return

  #         $("button").bind "click", ->
  #           player.api $(this).text().toLowerCase()
  #           return

  #         return
  #     ).observes("controller.sourceAttr")

    # player = videojs(document.getElementsByClassName('video-js')[0], {preload: "metadata"}, ->
    #   outer.get('source').then (src)=>
    #     this.on "ended", =>
    #       outer.set('controller.finished', true)
    #     if src == "/videos/xxx" || src == "/videos/"
    #       outer.set('controller.duration', 0)
    #       $('#videoErrorModal').modal()

    #     else
    #       this.on "durationchange", =>
    #         outer.set('controller.duration', this.duration())
    # )


    # @get('controller').handleVideoDispose(player)


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
