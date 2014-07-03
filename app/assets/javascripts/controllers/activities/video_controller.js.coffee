Oli.VideoController = Ember.ObjectController.extend Ember.Evented, Oli.Componentable,
  needs: ['activities']

  transcript: (->
    @component("video")
    ).property()

  videoSrc: "/videos/video_1.mp4"

  handleVideoDispose: (player)->
    @set('controllers.activities.video', player)

  submitForm: (callback) -> 
    callback()