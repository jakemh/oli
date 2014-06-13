Oli.WordThreadController = Oli.ActivityBaseController.extend
  needs: "activities"

  setup: ->
    @dependentEntry()
   
    @get('chooseWordWords')
    @notifyPropertyChange('chooseWordWords')

  chooseWordWords: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        act = @get('activityController.activities').filterProperty('template', 'choose_word')[0]
        @component('word_select', act).then (c)->
          c.get('words').then (ws)->
           # resolve (_.map ws.filterProperty("selected", true), (obj, key) ->
           #          obj.word)
            resolve  _.map(ws.filterProperty("selected", true), (obj) -> obj.get('word'))
            
    ).property()


  parsedWords: (->
    @get('wordsBox')
    ).property("wordsBox")

  allWords: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @get('chooseWordWords').then (words)=>

          resolve @get('parsedWords').concat(words)
    ).property("wordsBox")

  wordsBox: (->
    ).property('dependentEntry')

  dependentActivity: (->
    @get('activity.dependencies').toArray()
    ).property()

  lists: (->
      [[],[],[],[],[],[]]
    ).property()

  dependentEntry: ->
    results = []
    for dAct in @get('dependentActivity').toArray()
      @entry("questions_values", "list", dAct).then (entry)=>
        entry = entry.toArray()[entry.get('length') - 1].get('post')
        if entry
          results = results.concat(entry.replace(/[,;]/g, " ").split(/\s+/))
          @set('wordsBox', results)
          @notifyPropertyChange('wordsBox')

  submitForm: (callback) -> 
    callback() 
