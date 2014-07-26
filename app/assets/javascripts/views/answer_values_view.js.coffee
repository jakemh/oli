Oli.AnswerValuesView = Em.View.extend
  didInsertElement: ->
    $('#values-box').focus();

  becomeFocused: (->
    ).on('didInsertElement')

  setFocus: (->
    @.$().find('.answer-box-large').focus();

    ).observes('controller.controllers.activities.content')

  keyPress: (e)->
    if e.keyCode == 13 or e.keyCode == 44
      @get('controller.handleDelimeter').apply(@get('controller'))
    
  keyUp: (e)->
    if e.keyCode == 8 or e.keyCode == 46
      @get('controller.handleDelete').apply(@get('controller'))

