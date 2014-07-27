Oli.Section = DS.Model.extend({
  name: DS.attr('string')
  topic: DS.belongsTo('topic', {async: true})
  activities: DS.hasMany('activity', {async: true})
  ready: false

  completed: ->
    new Ember.RSVP.Promise (resolve, reject)=>

      @get('activities').then (activities)->
        for act in activities.toArray()
          if !act.get('completed')
            resolve false
        resolve true

});