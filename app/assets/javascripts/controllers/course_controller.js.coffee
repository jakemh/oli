Oli.CourseController = Ember.ObjectController.extend({
  test: "TEST"
  course: ((model, obj) ->
    return @get('content')).property('name')

  # topics:  ((model, obj) ->
  #     @content.get('topics')
  #   ).property('name')
    
  sections:  ((model, obj) ->
       
    ).property('name')
});