Oli.FreeVideoController = Ember.ObjectController.extend Ember.Evented, Oli.Componentable,
  needs: ["activities"]

  notchBarLength: 1
  noHover: true
  displayNoArrow: true
  hovering: null
  video: null
  preload: false
  hideButton: false
  buttonText: "Continue"


  handleVideoDispose: (player)->
    @set('video', player)


  title: (->
    @get('content.name')
    ).property("content")

  embedCode: ->
    return DS.PromiseObject.create promise:
      new Em.RSVP.Promise (resolve, reject) =>
        @videoComp(@get('content')).then (vid)->
          $.ajax(
            url: "http://vimeo.com/api/oembed.json?url=http://vimeo.com/user31408016/" + vid.get('file_name')
            type: "get"
            dataType: "json"
          ).always (response) ->
            resolve response

   source: (->
    return DS.PromiseObject.create promise:
      new Em.RSVP.Promise (resolve, reject) =>
        @videoComp(@get('content')).then (vid)=>
          # resolve '/videos/' + vid.get('file_name')
          @embedCode().then (code)=>
            src = '//player.vimeo.com/video/' + code["video_id"]  + "?api=1&player_id=vimeoplayer"
            resolve src
            @set('sourceAttr', src)
    ).property("content")

  # source: (->
  #   return DS.PromiseObject.create promise:
  #     new Em.RSVP.Promise (resolve, reject) =>
  #       @videoComp(@get('content')).then (vid)->
  #         resolve '/videos/' + vid.get('file_name')
  #   ).property("content")

  width: "549"
  height: "320"

  actions: 
    buttonClicked: ->
      @transitionToRoute('me.free_videos')
