Oli.VideoController = Ember.ObjectController.extend Ember.Evented, Oli.Componentable,
  needs: ['activities']
  preload: false
  transcript: (->
    @component("video")
    ).property()

  source: "/videos/video_1.mp4"

  handleVideoDispose: (player)->
    @set('controllers.activities.video', player)

  width: "549"
  height: "320"

  submitForm: (callback) -> 
    callback()