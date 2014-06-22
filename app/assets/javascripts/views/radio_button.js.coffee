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
    return

  test: (->

    ).observes("selection")

  checked: false

  checkedObserver: (->
    @set('checked', @get("value") is @get("selection"))
    ).observes("selection")
)