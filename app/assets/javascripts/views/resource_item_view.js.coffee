Oli.ResourceItemView = Ember.View.extend
  didInsertElement: ->


  click: ->
    @$().find('.expand-resource').slideToggle()
    