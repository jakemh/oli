Oli.QuestionAnswersController = Ember.ObjectController.extend Oli.Componentable,
  needs: "activities"

  questionEntry1: (->
    @last_post("question_answer")
    ).property()

  submitForm: (callback)-> 
    @saveEntry("question_answer", @get('questionEntry1').content, callback)
    