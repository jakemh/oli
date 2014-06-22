Oli.WordThreadController = Oli.ActivityBaseController.extend
  needs: "activities"

  setup: ->
    @setLists()
    @dependentWords()


  wordsBox: []
  placeHolder: (->
    "Drop a word here!"
    ).property("")

  dependentActivity: (->
    @get('activity.dependencies')
    ).property()

  lists: (->
    new Array(7)
    ).property("")

  listChanges: (->
    @get('activityController').boxUpdated()
    @notifyPropertyChange('listsExceptLast')
    @notifyPropertyChange('lastList')
    ).observes("lists.@each")

  setLists: ->
    # @get('allWords').then (all)=>
    @component("word_thread").then (c)=>
      c.get('boxes').then (bxs)=>
        for box, i in bxs.toArray()
          do (box, i)=>
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

  dependentWords: ->
    @component("word_thread").then (c)=>
      c.get('boxes').then (bs)=>
        lastBox = bs.get('lastObject')
        for dAct in @get('dependentActivity').toArray()
          do (dAct)=>
            @componentArray(["questions_values", "word_select"], dAct).then (c)=>
              c.get('words').then (ws)=>
                for word in ws.filterProperty('selected', true)
                  do (word) =>
                    box = word.get('box')
                    if box == null
                      lastBox.get('words').then (wx)=>
                        wx.pushObject(word)
                        @setLists()

  submitForm: (callback) -> 

      callback() 
