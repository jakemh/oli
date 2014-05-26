Oli.TopicsController = Ember.ObjectController.extend({
  needs: 'course'
  test: "TEST"
  # topic: @content
  disableLink: (->
    false)()

  sections: ((model, obj) ->
    if @content
      @content.get('sections')
    else 
      @store.getById('topic',1).get('sections')
    ).property('name')
});

Oli.TopicController = Ember.ObjectController.extend({
});