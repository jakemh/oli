Oli.BrainstormController = Oli.ActivityBaseController.extend Oli.Threadable,
  setup: ->
    @setFields()

    @get('activity.dependencies').then (actDs)=>
      @boxesForActivity(actDs.get('firstObject'), 'word_thread').then (boxes)=>
        for box in boxes.toArray()
          @joinedThread2(box).then (thread)=>
            if thread != ""
              @get('threadsList').pushObject thread

  minimumFields: 3

  component1: (->
    @component("brainstorm")
    ).property("")


  list: []
  threadsList: []

  newObj: {text: null, saved:false}
  setFields: ->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @entriesList().then (entries)=>
          @set('list', @get('list').concat(entries))
          while @get('list').length < @get('minimumFields')
            newObj = {text: null, saved:false}
            @get('list').pushObject(newObj)



  entriesList: ->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @entry("brainstorm", "brainstorm").then (entries)->
          if entries.length > 0
            e = entries.map((item, index)->
              {text: item.get('post'), saved: true}
              )
            resolve e
          else resolve []

  actions:
    addTask: ->
      @get('list').insertAt(0, {text: null, saved:false})


  submitForm: (callback)->
    for item in @get('list').filterProperty("saved", false)
      @commitEntry("brainstorm", "brainstorm", item.text)
      item.saved = true
    callback()
