Oli.SectionsController = Ember.ObjectController.extend(Ember.Evented, {
  needs: "topics"

    

  actions:
    moveArrow: (element) ->
      @trigger('delegate.setArrow', @) 
  
    goHere: (act) ->
      @transitionToRoute('activities',act)

    hover: (item)->
      @set('hovering', item); 
      
    click: (item)->
      alert("TEST")
      @set('clicking', item); 
      
  activities:  ((model, obj) ->
    @content.get('activities')

    ).property('name')
  
});