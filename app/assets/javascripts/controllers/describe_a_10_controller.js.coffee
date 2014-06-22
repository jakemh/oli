Oli.DescribeA10Controller = Oli.ActivityBaseController.extend
  setup: ->
    @get('activityController').on('threadUpdater', @, @threadUpdater)
    @threadUpdater()


  threadUpdater: ->
    @notifyPropertyChange("thread")

  thread: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @get('activity').get('box_dependencies').then (box)->
          box.get('firstObject').get('words').then (words)->
            resolve words.toArray()
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


  threadEntry: (->

    ).property()


  component1: (->
    @component("describe_a_10_1")
    ).property("controllers.activities.content")


  component2: (->
    @component("describe_a_10_2")
    ).property()

  