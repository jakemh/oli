Oli.WordThreadController = Oli.ActivityBaseController.extend
  needs: "activities"

  setup: ->
    @dependentEntry()
    @get('chooseWordWords')
    @get('setLists')
    @notifyPropertyChange('setLists')
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
          if @get('parsedWords')
            resolve @get('parsedWords').concat(words)
          else resolve null
    ).property("wordsBox")

  wordsBox: (->
    ).property('dependentEntry')

  dependentActivity: (->
    @get('activity.dependencies').toArray()
    ).property()

  setLists: (->
    @get('allWords').then (all)=>
      @set('lists', [[],[],[],[],[],[],all])
    ).property()

  lists: null

  listsExceptLast: (->
    if @get('lists')
      @get('lists').slice(0,-1)
    ).property('lists')

  lastList: (->
    if @get('lists')
      @get('lists').get('lastObject')
    ).property('lists')

  dependentEntry: ->
    results = []
    for dAct in @get('dependentActivity').toArray()
      @entry("questions_values", "list", dAct).then (e)=>
        entry = e.get('lastObject')
        if entry
          results = results.concat(entry.get('post').replace(/[,;]/g, " ").split(/\s+/))
          @set('wordsBox', results)
          @notifyPropertyChange('wordsBox')

  submitForm: (callback) -> 
    callback() 
