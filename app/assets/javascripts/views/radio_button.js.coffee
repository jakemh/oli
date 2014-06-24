Ember.RadioButton = Ember.View.extend(
  tagName: "input"
  type: "radio"


  attributeBindings: [
    "name"
    "type"
    "value"
    "checked:checked:"
  ]
  
  click: ->
    @set "selection", @$().val()

  checked: false

 

  checkedObserver: (->
    @set('checked', @get("value") == @get("selection"))
    ).observes("selection").on('init')
)