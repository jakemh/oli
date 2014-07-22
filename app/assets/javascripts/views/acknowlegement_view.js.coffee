Oli.AcknowledgementView = Ember.View.extend
  didInsertElement: ->

  buttonDisabled: (->
    @get('controller.buttonDisabled')
    ).property()



