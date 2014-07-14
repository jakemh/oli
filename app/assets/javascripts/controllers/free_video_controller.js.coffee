Oli.FreeVideoController = Ember.ObjectController.extend Ember.Evented, Oli.Componentable,
  
  notchBarLength: 1
  noHover: true
  displayNoArrow: true
  hovering: null
  video: null
  preload: "none" 
  hideButton: false
  buttonText: "Continue"
  handleVideoDispose: (player)->
    @set('video', player)

  source: (->
    return DS.PromiseObject.create promise:
      new Em.RSVP.Promise (resolve, reject) =>
        @videoComp(@get('content')).then (vid)->
          resolve '/videos/' + vid.get('file_name')
    ).property("content")

  width: "549"
  height: "320"

  actions: 
    buttonClicked: ->
      @transitionTo('free_videos')
