Oli.MeFreeVideosController = Ember.ObjectController.extend Ember.Evented, Oli.Componentable,
  needs: ["me"]
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

  buttonClicked: ->
 
    laddaLoadingButton = Ladda.create( document.querySelector( '.ladda-button' ) );
 
    laddaLoadingButton.start();

    $.ajax(
      url: "/payment"
      type: "get"
      dataType: "json"
    ).fail((error) =>
      laddaLoadingButton.stop()
    ).success((response)=>
      @store.push('user', response.user)
      @transitionTo('me')
      $('#myModal').modal()

    ).always ->
      laddaLoadingButton.stop()


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
        @videoComp(video).then (vid)->
          resolve '/videos/' + vid.get('file_name')

  width: "121"
  height: "67"

  actions:
    goToVideo: (video)->
      @transitionToRouteAnimated('free_video', main2: 'slowSlideLeft', video.index)

      # @transitionTo('free_video', video.index)
