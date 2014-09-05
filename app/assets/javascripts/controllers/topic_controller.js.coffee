Oli.TopicsController = Ember.ObjectController.extend({
  # topic: @content
  disableLink: (->
    false)()

  # sections:  ->
  #   if @content
  #     return @content.get('sections')
  #   else return null
  
});

Oli.TopicController = Ember.ObjectController.extend({
});