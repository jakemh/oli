Oli.MeCollapse = Ember.View.extend
  didInsertElement: ->


  actions:
    clickX: ->
      @$().slideUp("fast")