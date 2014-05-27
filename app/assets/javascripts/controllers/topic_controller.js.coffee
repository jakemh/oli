Oli.TopicsController = Ember.ObjectController.extend({
  needs: 'course'
  test: "TEST"
  # topic: @content
  disableLink: (->
    false)()

  sections: ((model, obj) ->
      @content.get('sections')
    ).property()
});

Oli.TopicController = Ember.ObjectController.extend({
});