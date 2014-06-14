Oli.AnswersValuesController = Oli.ActivityBaseController.extend


  setup: -> 
    @notifyPropertyChange('comp')
    @get('questionEntryList')
    @notifyPropertyChange('questionEntryList')
    @notifyPropertyChange('parsedWords')

    @notifyPropertyChange('dependentActivity')
    @get('dependentEntry')
    @notifyPropertyChange('dependentEntry')
    

  comp: (->
    @component("questions_values")
    ).property()

  input: null

  parsedWords: (-> 
    if @get('input')   
      @get('input').replace(/[,.;]/g, " ").split(/\s+/)
    ).property("input")

  dependentActivity: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) => 
        resolve @get('activity.dependencies').toArray()[0]
        
    ).property()

  dependentEntry: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>  
        @get('dependentActivity').then (act)=>
          @entry("question_answer", "paragraph", act).then (entry)->
            resolve entry.toArray()[entry.get('length') - 1]

    ).property()

  questionEntryList: ((k,v)->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>      
        @entry("questions_values", "list").then (e)=>
          lastEntry = e.toArray()[e.get('length') - 1]
          if lastEntry 
            @set('input', lastEntry.get('post'))
          else @set('input', null)
    ).property()

  submitForm: (callback)-> 
    @commitEntry("questions_values", "list", @get('input'), callback)
