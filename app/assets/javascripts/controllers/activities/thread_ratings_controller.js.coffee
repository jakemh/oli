Oli.ThreadRatingsController = Oli.ActivityBaseController.extend Oli.Threadable,
  
  setup: ->
    @_super()
    @get('activityController').on('threadUpdater', @, @threadUpdater)
    @threadUpdater()
    @notifyPropertyChange("box") 
    @notifyPropertyChange("buttons") #force buttons to reload
    @notifyPropertyChange("isSelected")
    @notifyPropertyChange("isSelected2")
    @ratingBase("thread_rating_1").then (rating1)=>
      @ratingBase("thread_rating_2").then (rating2)=>
        @set('input1', rating1)
        @set('input2', rating2)

    @registerInputs(=>
      ['input1', 'input2']
    )

  # validate: (->
  #   @get('joinedThread').then (t)=>
  #     if t == "" || (@input1 && @input2)
  #       @allowContinue()
  #     else @preventContinue()
  #   ).observes("input1", "input2")


  # validate: ->
  #   pass = true
  #   @get('joinedThread').then (t)=>
  #     @validateInputs((inputStatus) =>
  #       alert t
  #       if !inputStatus && t != ""
  #         pass = false
  #     )

  #     if pass
  #       @allowContinue()
  #     else @preventContinue()
  validate: ->
    pass = true
    @get('joinedThread').then (t)=>
      @validateInputs((inputStatus) =>
        if !inputStatus && t != ""
          pass = false
      )

      if pass
        @allowContinue()
      else @preventContinue()
         
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

  input1: null
  input2: null
  
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