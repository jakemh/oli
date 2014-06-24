Oli.ThreadRatingsController = Oli.ActivityBaseController.extend
  
  setup: ->
    @get('activityController').on('threadUpdater', @, @threadUpdater)
    @threadUpdater()
    @notifyPropertyChange("box") 
    @notifyPropertyChange("buttons") #force buttons to reload
    @notifyPropertyChange("isSelected")
    @notifyPropertyChange("isSelected2")

  threadUpdater: ->
    @notifyPropertyChange("thread")

  thread: (->
    console.log("THREAD0")
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @get('activity').get('box_dependencies').then (box)->
          box.get('firstObject').get('words').then (words)->
            console.log("THREAD: " + words.filterProperty('selected', true))
            filteredWords = words.filterProperty('selected', true)
            resolve filteredWords
    ).property("boxUpdated")

  joinedThread: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @get('thread').then (t)->
          console.log("JOINED THREAD: " + JSON.stringify t)
          mapped = t.map((item, index) ->
            item.get('word')
            )
          resolve mapped.join(", ")

  ).property("thread")

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


  isSelected: (->
    @ratingBase("thread_rating_1")
    ).property("")

  isSelected2: (->
    @ratingBase("thread_rating_2")
    ).property("")
  
  ratingChangedBase: (context, value)->
    @get('box').then (box)=>
      rating = @store.createRecord('rating', 
          value: value
          box: box
          context: context
        )

      box.get('ratings').then (ratings)=>
        ratings.pushObject(rating)
        rating.save().then (newRating)->

  buttonClicked: (view)->
    @ratingChangedBase(view.get('name'), view.get('value'))
  
  buttons: (->
    a = new Array(10)
    for index, i in a
      a[i] = i+1
    ).property()

  component1: (->
    @component("thread_rating_1")
    ).property()

  component2: (->
    @component("thread_rating_2")
    ).property()