Oli.WordSelectionView = Em.View.extend({
  didInsertElement: ->

  # willAnimateIn: ->
  #   @$().css "opacity", 0
  #   return

  # animateIn: (done) ->
  #   @$().fadeTo 500, 1, done
  #   return

  # animateOut: (done) ->
  #   @$().fadeTo 500, 0, done
  #   return


  component: (->
    @get('controller').component("word_select", @get('controller'))
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

  selected: (->
    @get('selectedItems').then (items)=>
      if items != undefined
        message = "Selected words: " + items
        @get('controller').set("status", message)
  ).property('component.words.@each.selected')


  components: (->
    @get('controller').get('components')
  ).property()

  value: 0

});


Oli.NewWord = Ember.View.extend({
  didInsertElement: ->
    
})

Oli.NewWordBox = Ember.TextField.extend({

  didInsertElement: ->
    @get('parentView.controller').on("becomeFocused", @, @becomeFocused)

  becomeFocused: (-> 
    @.$().focus();
  )

  cont: null
  theValue: null
  valChanged: (->
  ).property('value')

  valueBinding: 'parentView.controller.currentWord'
    
})

Oli.NewWordCheck = Ember.Checkbox.extend({
  didInsertElement: ->
    $('#example').tooltip()

  click: -> 
    if @get("parentView.controller.currentWord") != "" and @get("parentView.controller.currentWord") != null
      @get('parentView.controller.controllers.activities.components').then (cs)=>
        component = cs.toArray()[0]
        newWord = @get('parentView.controller.controllers.activities.store').createRecord('word', {
            word: @get('parentView.controller.currentWord')
            component: component
            selected: @get('checked')
            id: component.get('words.length') + 1
          })
        component.get('words').pushObject(newWord)
        @set('parentView.controller.currentWord', "")
        @set('checked', false)
    else 
      @set('checked', false)
      @get('parentView.controller').focus()

})