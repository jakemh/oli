Oli.ActivityView = Em.View.extend
  didInsertElement: -> 


Oli.TemplateView = Em.View.extend
  didInsertElement: ->
    
Oli.ActivitiesView = Em.View.extend
  didInsertElement: ->

Oli.StatusView = Ember.View.extend
  statusBinding: "controller.status"
  templateNameBinding: 'controller.templateName'

  templateNameObserver:( ->
    @rerender();
  ).observes('templateName')


