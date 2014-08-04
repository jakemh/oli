Oli.VideoController = Oli.ActivityBaseController.extend
  
  setup: ->
    @notifyPropertyChange('transcript')
    @notifyPropertyChange('source')
    @set('controllers.activities.buttonDisabled', true)
    @set('finished', false)
    

  needs: ['activities']
  preload: false
  player: null
  duration: false
  finished: false

  durationChange: (->
    if @get('duration') == 0
      @set('controllers.activities.buttonDisabled', false) 
    else 
      if @get('finished') == true
        @set('controllers.activities.buttonDisabled', false) 
    ).observes("duration", "finished")

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
    @set('player', player)

  width: "549"
  height: "320"

  submitForm: (callback) -> 
    callback()

