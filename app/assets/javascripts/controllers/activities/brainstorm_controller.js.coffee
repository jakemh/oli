Oli.BrainstormController = Oli.ActivityBaseController.extend Oli.Threadable, Ember.Copyable,


  setup: ->
    @setFields()
    @get('threadsList').then (list)->

    
              # if i == boxes.get('length')
                # @setFields()


  minimumFields: 3


  actionEntry: (componentContext, entryContext, activity)->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @component(componentContext, activity).then (c)->
          c.get('actionEntries').then (es)->
            current = es.filterProperty("context", entryContext)
            if current
              resolve(current)

  commitBoxEntry: (actionEntry, box_ids, callback) ->
    new Em.RSVP.Promise (resolve, reject) =>
      actionEntry.get('boxes').then (boxes) =>
        boxes.clear()
        for box_id, i in box_ids
          box = @store.getById('box', box_id)
          boxes.pushObject(box)
          if i == box_ids.length - 1
            actionEntry.save().then (response)=>
              resolve 

  # commitBoxEntry: (actionEntry, box_ids, callback) ->
  #   new Em.RSVP.Promise (resolve, reject) =>

  #     count = 0
  #     for box_id in box_ids
  #       do (box_id) =>
  #         box =  @store.getById('box', box_id)
  #         boxEntry = @get('store').createRecord('boxEntry', 
  #           actionEntry: actionEntry
  #           box_id: box.id
  #         )
  #         actionEntry.get('boxEntries').then (boxEntries) =>
  #           boxEntries.pushObject(boxEntry)

  #           # box.get('boxEntries').then (boxEntries) =>
  #           #   boxEntries.pushObject(boxEntry)
  #           #   alert "TEST"
  #           boxEntry.get('actionEntry').then (ae)=>
  #             boxEntry.save().then (response)=>
  #               count += 1
  #               if count == box_ids.length - 1
  #                 resolve 

  commitActionEntry: (componentContext, entryContext, message, threads, callback)->
   @component(componentContext).then (c)=>
      actionEntry = @get('store').createRecord('actionEntry', {
          component: c
          post: message
          context: entryContext
        })

      c.get('actionEntries').then (ues)=>
        ues.pushObject(actionEntry)
        actionEntry.save().then (response)=>
          @commitBoxEntry(response, threads).then (response)=>


  component1: (->
    @component("brainstorm")
    ).property("")


  list: (->
    []
    ).property("")

  sortedList: (->
    @get('list').sortBy('createdAt').reverse()
    ).property("list.@each")

  threadsList2: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        # alert _.clone(@get('threadsList'))
        @get('threadsList').then (list)->
          resolve Ember.copy(list)
          @set('test', {"value": "58", "label": "Word 9"})
    ).property()

  threadsList: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        array = []
        @get('activity.dependencies').then (actDs)=>

          @boxesForActivity(actDs.get('firstObject'), 'word_thread').then (boxes)=>
            i = 0
            for box in boxes.toArray()
              do (box) =>
                @joinedThread2(box).then (thread)=>
                  i+=1

                  if thread != ""
                    array.pushObject {value: box.id, label: thread}
                  if i == boxes.get('length')
                    resolve array
    ).property()

  # selectedThreads: null
  newObj: {entry_id: null, text: null, saved:false, selections: [[{value: 58, label: "Word 9"}]]}
  

  setFields: ->
    @entriesList().then (entries)=>
      @set('list', entries)
      while @get('list').length < @get('minimumFields')
        newObj = {entry_id: null, text: "", saved:false, selections:[]}
        @get('list').pushObject(newObj)

  entriesList: ->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @actionEntry("brainstorm", "brainstorm").then (entries)=>
          el = []
       
          i = entries.length
          if entries.length > 0 
            for entry in entries
              do (entry) =>
                entry.get('boxes').then (boxes)=>
                  boxesArray = boxes.map((item, index)-> {value: item.id})
                  el.pushObject({
                    entry_id: entry.id
                    text: entry.get('post')
                    saved: true
                    selections: boxesArray
                    createdAt: entry.get('created_at')
                    })

                  i -= 1
                  resolve el.reverse() if i == 0

          else resolve []

  actions:
    addTask: ->
      @get('list').insertAt(0, {
        entry_id: null
        text: null 
        saved:false
        selections: []
        createdAt: new Date()
        })

  submitForm: (callback)->
    # for item in @get('list').filterProperty("saved", false)
    for item in @get('list')
      do (item)=>
        if item.saved == false
          values = item.selections.map((item, index)-> item.value)
          if item.text && values
            @commitActionEntry("brainstorm", "brainstorm", item.text, values).then (response)=>
              # id = response.id
              # item.entry_id = id
              item.saved = true
          else 
            #post or values are empty
        else
          @store.find('actionEntry', item.entry_id).then (actionEntry)=>
            values = item.selections.map((item, index)-> item.value)

            @commitBoxEntry(actionEntry, values)

    callback()
