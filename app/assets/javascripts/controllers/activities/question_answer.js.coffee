Oli.QuestionAnswersController = Oli.ActivityBaseController.extend

  setup: -> 
    @_super()
    @notifyPropertyChange('comp')
    @setInput()
    # @notifyPropertyChange('questionEntryList')

  comp: (->
    @component("question_answer")
    ).property()

  input: null

  inputChanged: (->
    if (@get('input') && @get('input').length > 5) || @get('finished')
      @allowContinue()
    else @preventContinue()
    ).observes('input')

  setInput: -> 
    @entry("question_answer", "paragraph").then (e)=>
      lastEntry = e.toArray()[e.get('length') - 1]
      if lastEntry 
        @set('input', lastEntry.get('post'))
      else 
        @set('input', null)
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
    @commitEntry("question_answer", "paragraph", @get('input'), callback)
