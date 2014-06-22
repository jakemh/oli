Oli.ActivityView = Em.View.extend({
  didInsertElement: -> 
    # alert @get('controller.controllers.sections.activitiesPerSection')

  # test: "TESTING"
  # willAnimateIn: ->
  #   @$().css "opacity", 0
  #   return

  # animateIn: (done) ->
  #   @$().fadeTo 500, 1, done
  #   return

  # animateOut: (done) ->
  #   @$().fadeTo 500, 0, done
  #   return
});

  
Oli.EmptyView = Em.View.extend({
  didInsertElement: ->
    @get('controller').set("status", "")
})

  
Oli.StatusView = Ember.View.extend({
  statusBinding: "controller.status"
  templateNameBinding: 'controller.templateName'

  templateNameObserver:( ->
    @rerender();
  ).observes('templateName')

})

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