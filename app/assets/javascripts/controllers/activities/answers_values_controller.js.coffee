Oli.AnswersValuesController  = Oli.ActivityBaseController.extend


  setup: -> 
    @_super()
    @notifyPropertyChange('comp')
    @notifyPropertyChange('questionEntryList')
    @set('initialList', null)
    @notifyPropertyChange('dependentEntry')

    # @get('parsedWords').then (words)->
    #   alert words
    @get('questionEntryList').then (rawText)=>
      @set('input', rawText || "")
      @notifyPropertyChange('parsedWords')

      @set('initialList', @get('parsedWords'))

    # @get('questionEntryList')
    @notifyPropertyChange('dependentActivity')
    # @get('dependentEntry')
    @notifyPropertyChange('dependentEntry')
  
  
  initialList: null

  comp: (->
    @component("questions_values")
    ).property()

  input: null

  handleDelimeter: ->
    @notifyPropertyChange('parsedWords')

  handleDelete: ->
    @notifyPropertyChange('parsedWords')


  parsedWords: (-> 
    if @get('input')
      $.trim(@get('input')).split(/\s*,\s*|\s*\n\s*|\s*\r\s*/)
    ).property()

  parseWordsChanged: (->
    if @get('parsedWords.length') >= 3 || @get('finished')
      @allowContinue()
    else @preventContinue()
    ).observes("parsedWords.length")
  
  dependentActivity: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) => 
        @get('activity.dependencies').then (dActs)->
          resolve dActs.get('firstObject')

    ).property()

  dependentEntry: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>  
        @get('dependentActivity').then (act)=>
          @entry("question_answer", "paragraph", act).then (entry)->
            resolve entry.toArray()[entry.get('length') - 1]

    ).property()

  questionEntryList: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>      
        @entry("questions_values", "list").then (e)=>
          lastEntry = e.get('lastObject')
          # alert lastEntry

          if lastEntry 
            resolve lastEntry.get('post')
          else resolve null
    ).property()


  submitForm: (callback)-> 
    @notifyPropertyChange('parsedWords')
    @commitEntry("questions_values", "list", @get('input'), callback)
    additions = _.difference(@get('parsedWords'), @get('initialList'));
  

    subtractions = _.difference( @get('initialList'), @get('parsedWords'));
    @component("questions_values").then (component)=>
      
      for wordPrimitive in additions
        do (wordPrimitive) =>
          newWord = @store.createRecord('word', {
              word: $.trim(wordPrimitive)
              component: component
              selected: true
            })

          newWord.save().then (response)->
            # alert JSON.stringify response.id
            component.get('words').then (ws)->
              ws.pushObject(newWord)

      component.get('words').then (ws)->
        # alert "ALL: " + JSON.stringify ws.toArray()
        for wordPrimitive in subtractions
            deleteWord = ws.filterProperty('word', $.trim(wordPrimitive))[0]
            # alert "PRIM: " + wordPrimitive
            # alert deleteWord
            if deleteWord
              deleteWord.destroyRecord()


