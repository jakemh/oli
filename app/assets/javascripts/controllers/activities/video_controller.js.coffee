Oli.VideoController = Oli.ActivityBaseController.extend

  setup: ->
    @_super()
    @set('finished')
    @notifyPropertyChange('transcript')
    @notifyPropertyChange('source')
    @notifyPropertyChange('embedCode')
    @registerErrors(=>
      @error
    )
   

  preload: false
  player: null
  duration: false
  sourceAttr: null
  finished: null

  error: "Please finish the video before proceeding!"

  videoFinished: ->
    # alert "FIN"
    # @set('finished', true)
    @allowContinue()


  embedCode: ->
    return DS.PromiseObject.create promise:
      new Em.RSVP.Promise (resolve, reject) =>
        @videoComp(@get('controllers.activities.content')).then (vid)->
          $.ajax(
            url: "http://vimeo.com/api/oembed.json?url=http://vimeo.com/user31408016/" + vid.get('file_name')
            type: "get"
            dataType: "json"
          ).always (response) ->
            resolve response

  # validation: (->
  #   # if @get('duration') == 0
  #   #   @allowContinue()
  #   # else 
  #   if @get('finished') == true
  #     @allowContinue()
  #   ).observes("finished")

  transcript: (->
    @component("video")
    ).property()

  source: (->
    return DS.PromiseObject.create promise:
      new Em.RSVP.Promise (resolve, reject) =>
        @videoComp(@get('controllers.activities.content')).then (vid)=>
          # resolve '/videos/' + vid.get('file_name')
          @embedCode().then (code)=>
            src = '//player.vimeo.com/video/' + code["video_id"]  + "?api=1&player_id=vimeoplayer"
            resolve src
            @set('sourceAttr', src)
    ).property("content")

  handleVideoDispose: (player)->
    @set('controllers.activities.video', player)
    @set('player', player)

  width: "549"
  height: "320"

  submitForm: (callback) -> 
    callback()

