Oli.QuestionAnswerView = Em.View.extend
  didInsertElement: ->
    @.$().find('.answer-box-large').focus();

  becomeFocused: (->
    ).on('didInsertElement')

  setFocus: (->
    @.$().find('.answer-box-large').focus();

    ).observes('controller.controllers.activities.content')