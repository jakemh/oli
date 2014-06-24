Oli.DescribeA10Controller = Oli.ActivityBaseController.extend
  setup: ->
    @get('activityController').on('threadUpdater', @, @threadUpdater)
    @threadUpdater()
    @threadEntry1().then (t1)=>
      @set('input1', t1)

    @threadEntry2().then (t2)=>
      @set('input2', t2)


  threadUpdater: ->
    @notifyPropertyChange("thread")

  thread: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @get('activity').get('box_dependencies').then (box)->
          box.get('firstObject').get('words').then (words)->
            resolve words.filterProperty('selected', true)
    ).property("boxUpdated")

  joinedThread: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @get('thread').then (t)->
          mapped = t.map((item, index) ->
            item.get('word')
            )
          resolve mapped.join(", ")

  ).property("thread")


  input1: null
  input2: null

  threadEntry1: ->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @entry("describe_a_10_1", "describe_a_10_1").then (entries)->
          if entries.length > 0
            e = entries[entries.length - 1].get('post')
            resolve e
          else resolve null
  


  threadEntry2: ->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @entry("describe_a_10_2", "describe_a_10_2").then (entries)->
          if entries.length > 0
            resolve entries[entries.length - 1].get('post')
          else resolve null


  component1: (->
    @component("describe_a_10_1")
    ).property("")


  component2: (->
    @component("describe_a_10_2")
    ).property()


  submitForm: (callback)->
   @commitEntry("describe_a_10_1", "describe_a_10_1", @get('input1'), callback)
   @commitEntry("describe_a_10_2", "describe_a_10_2", @get('input2'), callback)
  