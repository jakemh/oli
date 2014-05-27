Oli.CourseController = Ember.ObjectController.extend({
  test: "TEST"
  needs: "activities"
  course: ((model, obj) ->
    return @get('content')).property('name')
    
  sections:  ((model, obj) ->
       
    ).property('name')
      
});