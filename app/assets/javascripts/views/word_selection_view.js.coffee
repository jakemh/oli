Oli.WordSelectionView = Em.View.extend({
  didInsertElement: ->

  willAnimateIn: ->
    @$().css "opacity", 0
    return

  animateIn: (done) ->
    @$().fadeTo 500, 1, done
    return

  animateOut: (done) ->
    @$().fadeTo 500, 0, done
    return

  isChecked: ->
    alert("CHECKED")
  test: ->
    alert("TEST")


  selectedItems: (->
    if @get('controller.words')
      for w in @get('controller.words').toArray()
        w.get('test')

      selected = @get("controller.words").filterBy("selected", true).get("length")
  ).property('controller.words.@each.selected')

  selected: (->
    if @get('selectedItems') != undefined
      message = "Selected words: " + @get('selectedItems')
      @get('controller').set("status", message)

  ).property('controller.words.@each.selected')


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
    # alert @get('parentView.controller')
    @get('parentView.controller').on("becomeFocused", @, @becomeFocused)

  becomeFocused: (-> 
    @.$().focus();
  )

  cont: null
  theValue: null
  valChanged: (->
    alert("TEST")
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