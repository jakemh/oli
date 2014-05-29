Oli.ActivityView = Em.View.extend({
  test: "TESTING"
  
});

Oli.WordSelectionView = Em.View.extend({
  didInsertElement: ->

  words: (->
    act = @get('controller').content
    return act.get('components')
  ).property()

  value: 0

});
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