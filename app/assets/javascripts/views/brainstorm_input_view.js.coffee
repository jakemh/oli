Oli.BrainstormInputView = Ember.TextField.extend
  classNameBindings: [
    ":oli-form-field-long",
    ":no-margin",
    "error:box__input--error"

  ]
  
  didInsertElement: ->
    @get('parentView.controller').addObserver(@get('errorClass'), @get('controller'), @setError)
   
  error: false
  errorClass: null
  setError: -> 
    alert "TSET"
    @set('error', @get('parentView.controller').get(@get('errorClass')))

  