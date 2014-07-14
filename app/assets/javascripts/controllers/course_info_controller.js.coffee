Oli.CourseInfoController = Ember.ObjectController.extend Ember.Evented,
  needs: ["me"]
  badgeCount: new Array(4)

  # topics: (->

  #   return DS.PromiseObject.create promise: 
  #     new Em.RSVP.Promise (resolve, reject) =>
  #       @get('content').get('topics').then (topics)=>
  #         alert JSON.stringify topics.toArray()
  #         resolve topics
  #   ).property()