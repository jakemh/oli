Oli.WordThreadController = Oli.ActivityBaseController.extend Oli.Threadable,
  needs: "activities"

  minThreads: 4

  setup: ->
    @_super()
    @setLists()
    @dependentWords()

  wordsBox: []
  placeHolder: (->
    "Drop a word here!"
    ).property("")

  handleWordDrop: (newList) ->
    newList.save()
    @listValidation()


  dependentActivity: (->
    new Em.RSVP.Promise (resolve, reject) =>
      resolve @get('activity.dependencies')

    ).property()

  lists: (->
    new Array(7)
    ).property("")

  listChanges: (->
    @get('activityController').boxUpdated()
    @notifyPropertyChange('listsExceptLast')
    @notifyPropertyChange('lastList')

    ).observes("lists.@each")

  listValidation: (->
    counter = 0
    for list in @get('listsExceptLast')
      if list &&  list.get('length') > 0
        counter += 1

    if counter >= @minThreads
      @allowContinue()
    else 
      @preventContinue()

    ).observes("lists.@each")

  setLists: ->
    # @get('allWords').then (all)=>
    @component("word_thread").then (c)=>
      if c
        c.get('boxes').then (bxs)=>
          for box, i in bxs.toArray()
            do (box, i)=>
              @joinedThread2(box).then (thread)->
              # alert @get('lists')[i] + "  :  " + box.get('words')
              box.get('words').then (b)=>

                @get('lists')[i] = b
                @notifyPropertyChange('lists.@each')

  listsExceptLast: (->
    if @get('lists')
      @get('lists').slice(0,-1)
    ).property('lists.@each')

  lastList: (->
    if @get('lists')
      @get('lists')[6]
      # @get('lists').get('lastObject')
    ).property('lists.@each')

  addWordToBox: (word, box, lastBox)->
    lastBox.get('words').then (wx)=>
        wx.pushObject(word)
        @setLists()
  


  dependentWords: ->
    @component("word_thread").then (c)=>
      c.get('boxes').then (bs)=>
        lastBox = bs.get('lastObject')
        @get('dependentActivity').then (dActs)=>
          for dAct in dActs.toArray()
            do (dAct)=>
              @componentArray(["questions_values", "word_select"], dAct).then (c)=>
                c.get('words').then (ws)=>
                  for word in ws.filterProperty('selected', true)
                    do (word) =>
                      box = word.get('box')
                      if box == null
                        @addWordToBox(word, box, lastBox)
                      else 
                        word.get('box').then (box)=>
                          if box == null
                            @addWordToBox(word, box, lastBox)

  submitForm: (callback) -> 

      callback() 
