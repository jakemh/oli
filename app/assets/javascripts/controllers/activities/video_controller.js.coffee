Oli.VideoController = Oli.ActivityBaseController.extend
  
  setup: ->
    @notifyPropertyChange('transcript')
    @notifyPropertyChange('source')

  needs: ['activities']
  preload: false
  transcript: (->
    @component("video")
    ).property()

  source: (->
    return DS.PromiseObject.create promise:
      new Em.RSVP.Promise (resolve, reject) =>
        @videoComp(@get('controllers.activities.content')).then (vid)->
          resolve '/videos/' + vid.get('file_name')
    ).property("content")

  handleVideoDispose: (player)->
    @set('controllers.activities.video', player)

  width: "549"
  height: "320"

  submitForm: (callback) -> 
    callback()