Oli.MeFreeVideosController = Ember.ObjectController.extend Ember.Evented, Oli.Componentable,
  needs: ["me", "activities"]
  video: null
  notchGap: false

  handleVideoDispose: (player)->
    @set('video', player)


  videos: (->
    new Em.RSVP.Promise (resolve, reject) =>
      @store.find("activity", {template: "free_video"}).then (videos)->
        resolve videos
    ).property()

  videoByRelativeId: (relativeId)->
    new Em.RSVP.Promise (resolve, reject) =>
      @get('videos').then (videos)=>
        v = videos.objectAtContent(relativeId - 1)
        resolve v

  purchaseTransition: (->
   
  ).property()
  buttonClicked: ->
 
    laddaLoadingButton = Ladda.create( document.querySelector( '.ladda-button' ) );
 
    laddaLoadingButton.start();

    $.ajax(
      url: "/payment"
      type: "post"
      dataType: 'json'
      beforeSend: (xhr) ->
        xhr.setRequestHeader "X-CSRF-Token", $('meta[name="csrf-token"]').attr("content")
    ).fail((error) =>
      alert JSON.stringify error 

      # alert "FAIL" + JSON.stringify error
      laddaLoadingButton.stop()

    ).success((response)=>
      # window.location = decodeURI response
      window.location.href = "/me/first_login"
      # @store.push('user', response.user)
      # @transitionTo('course_info')
      # $('#myModal').modal()
    ).always ->
      # laddaLoadingButton.stop()

  embedCode: (video)->
    return DS.PromiseObject.create promise:
      new Em.RSVP.Promise (resolve, reject) =>
        @videoComp(video).then (vid)->
          $.ajax(
            url: "http://vimeo.com/api/oembed.json?url=http://vimeo.com/user31408016/" + vid.get('file_name')
            type: "get"
            dataType: "json"
          ).always (response) ->
            resolve response

  videosFormatted: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        formattedObjs = []
        @get('videos').then (vids)=>
          count = vids.get('length')
          for vid, i in vids.toArray()
            do (vid, i, formattedObjs) =>
              vid.get('components').then (comps)=>
                count -= 1
                description = comps.filterProperty("context", "free_video_preview")[0].get('content')
                formattedObjs.pushObject(
                  id: vid.id
                  index: i + 1
                  title: vid.get('name')
                  description: description
                  width: @get('width')
                  height: @get('height')
                  source: @source(vid)
                  )
                
                resolve formattedObjs if count == 0
    ).property()

  source: (video)->
    return DS.PromiseObject.create promise:
      new Em.RSVP.Promise (resolve, reject) =>
        @videoComp(video).then (vid)=>
          @embedCode(video).then (code)=>
            src = '//player.vimeo.com/video/' + code["video_id"]  + "?api=1&player_id=vimeoplayer"
            resolve src
            @set('sourceAttr', src)

  # source: (->
  #   return DS.PromiseObject.create promise:
  #     new Em.RSVP.Promise (resolve, reject) =>
  #       @videoComp(@get('controllers.activities.content')).then (vid)=>
  #         # resolve '/videos/' + vid.get('file_name')
  #         @embedCode().then (code)=>
  #           src = '//player.vimeo.com/video/' + code["video_id"]  + "?api=1&player_id=vimeoplayer"
  #           resolve src
  #           @set('sourceAttr', src)
    # ).property("content")

  width: "121"
  height: "67"

  actions:
    goToVideo: (video)->
      window.location.href = "/welcome/" + video.index

      # @transitionTo('free_video', video.index)
