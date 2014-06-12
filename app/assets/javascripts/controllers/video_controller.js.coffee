Oli.VideoController = Ember.ObjectController.extend Ember.Evented, Oli.Componentable,
  needs: ['activities']

  transcript: (->
    @component("video")
    ).property()

  submitForm: (callback) -> 
    callback()