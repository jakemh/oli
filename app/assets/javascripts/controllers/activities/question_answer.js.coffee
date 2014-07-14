Oli.QuestionAnswersController = Oli.ActivityBaseController.extend

  setup: -> 
    @notifyPropertyChange('comp')
    @notifyPropertyChange('questionEntry')
    # @notifyPropertyChange('questionEntryList')

  comp: (->
    @component("question_answer")
    ).property()



  questionEntry: (->
    return DS.PromiseObject.create promise: 

      new Em.RSVP.Promise (resolve, reject) =>      
        @entry("question_answer", "paragraph").then (e)->
          lastEntry = e.toArray()[e.get('length') - 1]
          if lastEntry 
            resolve lastEntry.get('post')
          else resolve ""
    ).property()

  # questionEntryList: (->
  #   return DS.PromiseObject.create promise: 
  #     new Em.RSVP.Promise (resolve, reject) =>      
  #       @entry("question_answer", "list").then (e)->
  #         lastEntry = e.toArray()[e.get('length') - 1]
  #         if lastEntry 
  #           resolve lastEntry.get('post')
  #         else resolve null
  #   ).property()


  submitForm: (callback)-> 
    @commitEntry("question_answer", "paragraph", @get('questionEntry').content, callback)
