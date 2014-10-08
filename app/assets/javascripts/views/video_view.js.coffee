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
    player = videojs(document.getElementsByClassName('video-js')[0], {preload: "metadata"}, ->
      outer.get('source').then (src)=>
        this.on "ended", =>
          outer.set('controller.finished', true)
        if src == "/videos/xxx" || src == "/videos/"
          outer.set('controller.duration', 0)
          $('#videoErrorModal').modal()

        else
          this.on "durationchange", =>
            outer.set('controller.duration', this.duration())
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
