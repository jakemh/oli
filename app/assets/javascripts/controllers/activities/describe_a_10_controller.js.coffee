Oli.DescribeA10Controller = Oli.ActivityBaseController.extend Oli.Threadable,
  
  setup: ->
    @_super()
    
    @registerInputs(=>
      ['input1', 'input2']
    )
      # [@get('input1'), @get('input2')]
    @addObserver(@get('input1'), @get('input1'), @validateInput)

    @get('activityController').on('threadUpdater', @, @threadUpdater)
    @threadUpdater()
    @threadEntry1().then (t1)=>
      @set('input1', t1)

    @threadEntry2().then (t2)=>
      @set('input2', t2)

  threadUpdater: ->
    @notifyPropertyChange("thread")

  input1: null
  input2: null
  boxOneError: false
  boxTwoError: false

  validate: ->
    pass = true
    @get('joinedThread').then (t)=>
      @validateInputs((inputStatus) =>
        if !inputStatus && t != ""
          pass = false
      )

      if pass
        @allowContinue()
      else @preventContinue()


      #thread is blank OR
      # if t == "" || (@get('input1')  && @get('input2')  && @get('input1').length >= @minLength && @get('input2').length >= @minLength)
      #   @allowContinue()
      # else @preventContinue()




  threadEntry1: ->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @entry("describe_a_10_1", "describe_a_10_1").then (entries)->
          if entries.length > 0
            e = entries[entries.length - 1].get('post')
            resolve e
          else resolve null
  


  threadEntry2: ->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @entry("describe_a_10_2", "describe_a_10_2").then (entries)->
          if entries.length > 0
            resolve entries[entries.length - 1].get('post')
          else resolve null


  component1: (->
    @component("describe_a_10_1")
    ).property("")

  component2: (->
    @component("describe_a_10_2")
    ).property()


  submitForm: (callback)->
   @commitEntry("describe_a_10_1", "describe_a_10_1", @get('input1'), callback)
   @commitEntry("describe_a_10_2", "describe_a_10_2", @get('input2'), callback)
  