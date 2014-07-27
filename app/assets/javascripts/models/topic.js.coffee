Oli.Topic = DS.Model.extend
  name: DS.attr('string')
  course: DS.belongsTo('course',  {async: true})
  sections: DS.hasMany('section', {async: true})

  completed: (->
    new Ember.RSVP.Promise (resolve, reject)=>
      @get('sections').then (sections)->
        for sect in sections.toArray()
          if !sect.get('completed')
            resolve false
        resolve true
  ).property()

