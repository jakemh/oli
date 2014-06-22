Oli.ThreadRatingsController = Oli.ActivityBaseController.extend
  setup: ->
    @get('activityController').on('threadUpdater', @, @threadUpdater)
    @threadUpdater()
    @get 'box'

  threadUpdater: ->
    @notifyPropertyChange("thread")
  

  box: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @get('activityController.content.box_dependencies').then (boxes)->
          resolve boxes.get('firstObject')
    ).property()

  ratingBase: (context)->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @get('box').then (box)->
          box.get('ratings').then (ratings)->
            ratings = ratings.filterProperty("context", context)
            if ratings.length > 0
              rating = ratings[ratings.length - 1]
              resolve rating.get('value')
            else resolve null

  rating1: (->
    @ratingBase("current")
    ).property("")

  rating2: (->
    @ratingBase("future")
    ).property("")

  isSelected: (->
      @get('rating1')
    ).property("")

  isSelected2: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        resolve @get('rating2')
    ).property("")

  ratingChanged1: (->
    @ratingChangedBase("current")
    ).observes('isSelected.content')

  ratingChanged2: (->
    @ratingChangedBase("future")
    ).observes('isSelected2')

  ratingChangedBase: (context)->
    @get('box').then (box)=>
      rating = @store.createRecord('rating', 
          value: @get('isSelected.content')
          box: box
          context: context
        )

      box.get('ratings').then (ratings)=>
        ratings.pushObject(rating)
        rating.save().then (newRating)->

  buttons: (->
    a = new Array(10)
    for index, i in a
      a[i] = i+1
    ).property()

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

  component1: (->
    @component("thread_rating_1")
    ).property()

  component2: (->
    @component("thread_rating_2")
    ).property()