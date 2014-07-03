Oli.Componentable = Ember.Mixin.create
  
  setup: -> 
    
  component: (context_type, context)->
    if context
      self = context.get('components') 
    else self = @get("controllers.activities.components")
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        self.then (cs)->
          comp = cs.filterProperty("context", context_type)
          resolve(comp[0])

  componentArray: (contextTypeArray, context)->
    if context
      self = context.get('components') 
    else self = @get("controllers.activities.components")
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        self.then (cs)->
          comp = cs.filter((item, index) ->
            for context in contextTypeArray
              if item.get('context') == context
                return true
            )

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

  @deprecated
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

  entry: (componentContext, entryContext, activity)->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @component(componentContext, activity).then (c)->
          c.get('entries').then (es)->
            current = es.filterProperty("context", entryContext)
            if current
              resolve(current)
   
  @deprecated 
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

   commitEntry: (componentContext, entryContext, message, callback)->
    @component(componentContext).then (c)=>
      entry1 = @get('store').createRecord('entry', {
          component: c
          post: message
          context: entryContext
        })

      c.get('entries').then (ues)=>
        ues.pushObject(entry1)
        entry1.save().then (response)=>
          if callback
            callback(response)


