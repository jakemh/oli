Oli.EmailFormController = Ember.ObjectController.extend
  needs: "activities"

  init: ->
    @get('controllers.activities').on("buttonPressed", @, @submitForm)

  saveHelper: (typeComponent, typeEntry)->
    @get(typeComponent).then (a)=>
      entry1 = @get('store').createRecord('entry', {
          component: a
          post: @get(typeEntry).get('content')
        })
      a.get('entries').then (ues)=>
        ues.pushObject(entry1)
        entry1.save()

  submitForm: ->
    @.saveHelper("addressComponent", "addressEntry")
    @.saveHelper("subjectComponent", "subjectEntry")
    @.saveHelper("bodyComponent", "bodyEntry")

  entryHelper: (typeComponent)->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @get(typeComponent).then (s)->
          userEntries = s.get('entries')
          userEntries.then (entries)->
            entryArray = entries.toArray()
            userEntry = entryArray[entryArray.length - 1]
            alert JSON.stringify entryArray

            if userEntry
              resolve(userEntry.get('post'))
            else resolve(s.get('content'))

  componentHelper: (emailContextType)->
    return new Em.RSVP.Promise (resolve, reject) =>
      @get('controllers.activities.content.components').then (cs)->
        resolve(cs.toArray().filterProperty("context", emailContextType)[0])

  addressComponent: (->
      @.componentHelper('email_address')
    ).property()

  subjectComponent: (->
      @.componentHelper('email_subject')
    ).property()

  bodyComponent: (->
      @.componentHelper('email_body')
    ).property()

  addressEntry: (->
      @.entryHelper('addressComponent')
    ).property()

  subjectEntry: (->
      @.entryHelper('subjectComponent')
    ).property()

  bodyEntry: (->
      @.entryHelper('bodyComponent')
    ).property()