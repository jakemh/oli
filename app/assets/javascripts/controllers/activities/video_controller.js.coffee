Oli.VideoController = Oli.ActivityBaseController.extend
  
  setup: ->
    @_super()
    @notifyPropertyChange('transcript')
    @notifyPropertyChange('source')


  preload: false
  player: null
  duration: false

  validation: (->
    if @get('duration') == 0
      @allowContinue()
    else 
      if @get('finished') == true
        @allowContinue()
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

