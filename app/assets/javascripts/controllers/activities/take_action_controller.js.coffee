Oli.TakeActionController = Oli.ActivityBaseController.extend
  setup: ->
    @_super()
    @notifyPropertyChange("dependentTasks")
    @notifyPropertyChange("dependentTasksMapped")

  lastDate: null

  input1: null
  input2: null
  prompt: "Please select a task"
  dependentActivities: (->
    new Em.RSVP.Promise (resolve, reject) => 
      @get('controllers.activities.dependencies').then (dependents)=>
        resolve dependents
    ).property('controllers.activities.content')


  dependentTasks: (->
    new Em.RSVP.Promise (resolve, reject) =>
      @get('dependentActivities').then (act)=>
        @component("brainstorm", act.get('firstObject')).then (comp)=>
          comp.get('actionEntries').then (entries)=>
            resolve(entries)
    ).property("")

  selectedTask: null

  validate: (->
    @get("actionsList").then (list)=>
      if list.get('length') >= @minLength
        @allowContinue()
      else @preventContinue()

  ).observes("actionsList.content.@each")

  dependentTasksMapped: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @get('dependentTasks').then (tasks)->
          resolve tasks.map((item, index) ->
            item.get('post') 
            )
    ).property("dependentTasks")

  actionDateChanged: (date)->
    @set('lastDate', date)

  calendarEntry: (componentContext, entryContext, activity)->
      return DS.PromiseObject.create promise: 
        new Em.RSVP.Promise (resolve, reject) =>
          @component(componentContext, activity).then (c)->
            c.get('userCalendarEntries').then (es)->
              current = es.filterProperty("context", entryContext)
              if current
                resolve(current)


  actionsList: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @calendarEntry("take_action_1", "take_action_1").then (list)=>
          list = list.reverse().map (item, index)->
            date = moment(item.get('date')).format("MMMM Do, YYYY")
            text = item.get('entry')
            dateForExt = moment(item.get('date')).format("MM-DD-YYYY")
            {date: date, dateForExt: dateForExt, description: text}
          resolve list
    ).property("")

  commitCalendarEntry: (componentContext, entryContext, message, date, callback)->
   @component(componentContext).then (c)=>
     entry1 = @get('store').createRecord('userCalendarEntry', {
         component: c
         entry: message
         date: date
         context: entryContext
         added_to_calendar: false
         date: @get("lastDate")
       })

     c.get('userCalendarEntries').then (ues)=>
       ues.pushObject(entry1)
       entry1.save()
       if callback
         callback()

  date: null

  buttonDisabled: (->
    if @get('date') == "" || @get('date') == null || @get('selectedTask') == "" || @get('selectedTask') == null
      return true
    else false
    ).property("date","selectedTask")

  calendarField: ->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @entry("take_action_2", "take_action_2").then (entries)->
          if entries.length > 0
            e = entries[entries.length - 1].get('post')
            resolve e
          else resolve null

  component1: (->
    @component("take_action_1")
    ).property("")


  component2: (->
    @component("take_action_2")
    ).property()

  actions: 
    addAction: -> 
      @commitCalendarEntry("take_action_1", "take_action_1", @get('selectedTask'), @get('input2'))
      @notifyPropertyChange('actionsList')
      @set('date', "")
      @set('selectedTask', null)

