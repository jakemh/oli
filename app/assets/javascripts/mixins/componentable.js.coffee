Oli.Componentable = Ember.Mixin.create

  component: (context_type)->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @get("controllers.activities.components").then (cs)->
          comp = cs.filterProperty("context", context_type)
          resolve(comp[0])

  last_entry: (context_type)->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @component(context_type).then (c)->
          c.get('entries').then (es)->
            current = es.toArray()[es.get('length') - 1]
            if current
              resolve(current)
            else resolve(c.get('content'))

  last_post: (context_type)->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @component(context_type).then (c)->
          c.get('entries').then (es)->
            current = es.toArray()[es.get('length') - 1]

            if current
              resolve(current.get('post'))
            else
              resolve(c.get('content'))

  saveEntry: (context_type, message, callback)->
    @component(context_type).then (c)=>
      entry1 = @get('store').createRecord('entry', {
          component: c
          post: message
        })
      c.get('entries').then (ues)=>
        ues.pushObject(entry1)
        entry1.save()
        if callback
          callback()