Oli.WordThreadController = Oli.ActivityBaseController.extend
  needs: "activities"

  setup: ->
    @dependentWords()

    @notifyPropertyChange('setLists')
    @notifyPropertyChange('chooseWordWords')
    @notifyPropertyChange('allWords')

  chooseWordWords: (->
    act = @get('activityController.activities').filterProperty('template', 'choose_word')[0]
    @component('word_select', act).then (c)=>
      c.get('boxxes').then (boxes)->
        lastBox = boxes.get('lastObject')
        c.get('words').then (ws)->
          for word in ws.filterProperty('selected', true)
            box = word.get('boxx')
            if box == null or box.id == lastBox.id
              word.set('boxx', lastBox)
    ).property()

  allWords: (->
    new Em.RSVP.Promise (resolve, reject) =>
      @get('chooseWordWords').then (words)=>
        if @get('wordsBox')
          resolve @get('wordsBox').concat(words)
        else resolve words
    ).property("wordsBox")

  wordsBox: []

  dependentActivity: (->
    @get('activity.dependencies')
    ).property()

  lists: []

  listChanged: (->
    alert @get('lists').get('firstObject')
    ).property('lists')

  setLists: (->

    @get('allWords').then (all)=>
      @component("word_thread").then (c)=>
        c.get('boxxes').then (bxs)=>

          boxes = bxs.toArray()
          b1 = boxes[0].get('words')
          b2 = boxes[1].get('words')
          b3 = boxes[2].get('words')
          b4 = boxes[3].get('words')
          b5 = boxes[4].get('words')
          b6 = boxes[5].get('words')
          b7 = boxes[6].get('words')

          @set('lists', [b1,b2,b3,b4,b5,b6,b7])

          @notifyPropertyChange('lists')
          # for box in bxs.toArray()
          #   do (box)=>
          #     box.get("words").then (words)=>
          #       list = _.map(words.filterProperty("selected", true), (obj) -> obj.get('word'))
          #       # @set('lists', [bsx[0].toArray(),[],[],[],[],[],all])
          #       @get('lists').pushObject(list)
          #       @notifyPropertyChange('lists')
    ).observes("wordsBox", "dependentWord", "chooseWordWords")


  listsExceptLast: (->
    if @get('lists')
      @get('lists').slice(0,-1)
    ).property('lists')

  lastList: (->
    if @get('lists')
      @get('lists').get('lastObject')
    ).property('lists')

  dependentWords: ->

    @component("word_thread").then (c)=>
      c.get('boxxes').then (bs)=>
        lastBox = bs.get('lastObject')
        for dAct in @get('dependentActivity').toArray()
          do (dAct)=>
            @component("questions_values", dAct).then (c)=>
              c.get('words').then (ws)=>
                for word in ws.filterProperty('selected', true)
                  box = word.get('boxx')
                  if box == null or box.id == lastBox.id
                    word.set('boxx', lastBox)
                    # @notifyPropertyChange('wordsBox')


        # dependentEntry: ->
  #   results = []
  #   for dAct in @get('dependentActivity').toArray()
  #     @entry("questions_values", "list", dAct).then (e)=>
  #       entry = e.get('lastObject')
  #       if entry && entry.get('post')
  #         results = results.concat($.trim(entry.get('post')).split(/\s*,\s*|\s*\n\s*|\s*\r\s*/))

  #         @set('wordsBox', results)
  #         @notifyPropertyChange('wordsBox')

  submitForm: (callback) -> 
    # @component("word_thread").then (c)=>
    #   c.get('boxxes').then (bxs)=>
    #     for list in @get('lists')

    #       c.get('boxxes').then (bxs)=>
    #         boxes = bxs.toArray()
    #         b1 = boxes[0].get('words').toArray()
    #         b2 = boxes[1].get('words').toArray()
    #         b3 = boxes[2].get('words').toArray()
    #         b4 = boxes[3].get('words').toArray()
    #         b5 = boxes[4].get('words').toArray()
    #         b6 = boxes[5].get('words').toArray()
    #         b7 = boxes[6].get('words').toArray()
    #         @set('lists', [b1,b2,b3,b4,b5,b6,b7])
      callback() 
