Oli.Threadable = Ember.Mixin.create
  thread: (->
    console.log("THREAD02")
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @get('activity').get('box_dependencies').then (box)->
          box.get('firstObject').get('words').then (words)->
            console.log("THREAD2: " + words.filterProperty('selected', true))
            filteredWords = words.filterProperty('selected', true)
            resolve filteredWords
    ).property("boxUpdated")

  joinedThread: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @get('thread').then (t)->
          # console.log("JOINED THREAD2: " + JSON.stringify t)
          mapped = t.map((item, index) ->
            item.get('word')
            )
          resolve mapped.join(", ")

  ).property("thread")