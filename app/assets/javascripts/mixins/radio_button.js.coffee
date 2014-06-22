Oli.RadioButton = Ember.Component.extend(
  tagName: "input"
  type: "radio"
  attributeBindings: [
    "name"
    "type"
    "value"
    "checked:checked"
  ]
  click: ->
    @set "selection", @$().val()
    return

  checked: (->
    @get("value") is @get("selection")
  ).property("selection")
)
Em.Handlebars.helper "radio-button", Oli.RadioButton
Oli.ExtRadioComponent = Ember.Component.extend(name: "radio")