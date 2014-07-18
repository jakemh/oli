Oli.GratackInputView = Ember.View.extend
  didInsertElement: ->
    input = @.$().find('.ember-text-field')
    strLength= input.val().length;
    input.focus();
    input[0].setSelectionRange(strLength, strLength);