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
  
Oli.StatusView = Ember.View.extend({
  statusBinding: "controller.status"
  templateNameBinding: 'controller.templateName'

  templateNameObserver:( ->
    @rerender();
  ).observes('templateName')

})
