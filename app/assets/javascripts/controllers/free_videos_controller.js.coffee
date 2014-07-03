Oli.FreeVideosController = Ember.ObjectController.extend Ember.Evented,
  needs: ["me"]
  
  video: null
  handleVideoDispose: (player)->
    @set('video', player)


  video: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @store.find({"activity", template: "free_video"}).then (videos)->
          resolve videos
    ).property()