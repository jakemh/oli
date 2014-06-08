Oli.TopicsController = Ember.ObjectController.extend({
  needs: 'course'
  test: "TEST"
  # topic: @content
  disableLink: (->
    false)()

  
});

Oli.TopicController = Ember.ObjectController.extend({
});