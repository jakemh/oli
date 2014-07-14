Oli.ResourcesController = Ember.ObjectController.extend Ember.Evented,
  needs: ["me"]

  items: (->
        [
          {name: "Course Report", template: "me/partials/courseReport", object: null}
          {name: "Links", template: "me/partials/links", object: null}
          {name: "Daily Acknowledgments", template: "me/partials/acknowledgements", object: @get('acknowlegements')}
          {name: "Daily Gratitudes", template: "me/partials/gratitudes", object: @get('gratitudes')}
        ]
    ).property()

  acknowledgements: (->
    @store.find('entry', {context: "acknowledgement"})
    ).property('')
  

  gratitudes: (->
    @store.find('entry', {context: "gratitude"})
    ).property()


  dataFormatted: (type) ->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @get(type).then (acks)->
          resolve acks.map((item, index) -> 
            date: moment(item.get('created_at')).format("MMMM Do, YYYY")
            post: item.get('post')
            ).reverse()
         
  gratFormatted: (->
    @dataFormatted("gratitudes")
    ).property('gratitudes')

  ackFormatted: (->
    @dataFormatted("acknowledgements")
    ).property('acknowledgements')

  actions: 
    clickedItem: (item)->
      alert item
