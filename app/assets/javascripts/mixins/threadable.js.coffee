Oli.Threadable = Ember.Mixin.create



  thread: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @get('activity').get('box_dependencies').then (box)->
          box.get('firstObject').get('words').then (words)->
            filteredWords = words.filterProperty('selected', true)
            resolve filteredWords
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


  joinedThread2: (box)->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        box.get('words').then (words)->
          filteredWords = words.filterProperty('selected', true)
          mapped = filteredWords.map((item, index) ->
            item.get('word')
            )
          resolve mapped.join(", ")

  boxesForActivity: (act, compContext)->
    new Em.RSVP.Promise (resolve, reject) =>
      @component(compContext, act).then (comp)=>
        comp.get('boxes').then (boxes)=>
          resolve boxes