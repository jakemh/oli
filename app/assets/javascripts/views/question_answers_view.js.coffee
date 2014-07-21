Oli.QuestionsAnswersView = Em.View.extend 
  templateName: 'activity/questions_answers'
  didInsertElement: ->
    alert @.$().find('.answer-box-large').length
    @.$().find('.answer-box-large').focus();

  becomeFocused: (->
    ).on('didInsertElement')

  setFocus: (->
    @.$().find('.answer-box-large').focus();

    ).observes('controller.controllers.activities.content')

  rerenderView: (->
    @rerender()
    ).observes("controller.controllers.activities.content")