Oli.WordSelectionController = Oli.ActivityBaseController.extend Ember.Evented,
  setup: ->
    @_super()

  component: (->
    @get('activityController').component("word_select", @get('activityController'))
    ).property()

  selectedItems: (->
    new Ember.RSVP.Promise (resolve, reject)=>
      @get('component').then (c)->
        c.get('words').then (words)->
          for w in words.toArray()
            w.get('test')

          selected = words.filterBy("selected", true).get("length")
          resolve(selected)

  ).property('component.words.@each.selected')

  validate: (->
    @get('selectedItems').then (items)=>
      if (items >= 3  && items <= 10)
        @allowContinue()
      else 
        @preventContinue()
    ).observes('component.words.@each.selected')

  selected: (->
    @get('selectedItems').then (items)=>
      if items != undefined
        message = "Selected words: " + items
        if @get('activityController')
          @get('activityController').set("status", message)
  ).observes('component.words.@each.selected')


  components: (->
    @get('activityController').get('components')
  ).property()