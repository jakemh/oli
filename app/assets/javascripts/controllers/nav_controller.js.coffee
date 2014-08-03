Oli.NavController = Ember.ObjectController.extend
  needs: "bugs"
  

  actions:
    addBug: ->
      $("#bugModal").modal()  
