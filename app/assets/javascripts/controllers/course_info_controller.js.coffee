Oli.CourseInfoController = Ember.ObjectController.extend Ember.Evented,
  needs: ["me"]
  badgeCount: new Array(4)
  # init: ->
    
  #   this._super()
  
  topics: (->
    new Em.RSVP.Promise (resolve, reject) =>
      @get('content.topics').then (topics)=>
        resolve topics
    ).property()

  topicsViewPromises: (->
    viewArray = []
    new Em.RSVP.Promise (resolve, reject) =>

      @get('content.topics').then (topics)=>
        for topic in topics.toArray()
          do (topic)=>
            p = new Em.RSVP.Promise (resolve, reject) =>
                topic.get('sections').then (sects)=>
                  resolve 
                    name: topic.get('name')
                    available: sects.get('length') > 1
                    done: DS.PromiseObject.create promise: topic.get('completed')
            viewArray.push(p)
        resolve viewArray

    ).property()


  topicsView: (->
    if @get('content')
      return DS.PromiseObject.create promise: 
        new Em.RSVP.Promise (resolve, reject) =>
          @get('topicsViewPromises').then (tv) =>
            Em.RSVP.Promise.all(tv).then (tv2) =>
              resolve tv2
  ).property('content')

  