Oli.RatingButton = Ember.RadioButton.extend
  
  didInsertElement: ->

  click: ->
    this._super()
    @get('controller').buttonClicked(@)
