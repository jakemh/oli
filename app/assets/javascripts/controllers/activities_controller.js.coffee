Oli.ActivitiesController = Ember.ObjectController.extend Ember.Evented, Oli.Componentable,
  
  needs: ['sections']
  progress: null
  status: ""
  templateName: (->
    "status"
    ).property()
  newWordChanged:(->

  ).property('newWord')

  video: null
  buttonText: "Continue"
  status: (()->
    
  ).property()

  checked: ->
    
  hash: ->
    
    new Em.RSVP.Promise (resolve, reject) =>
      hash = {}
      @get('activities').then (acts)->

        for a, i in acts.toArray()
          hash[a] = (i + 1)
        resolve(hash)

  # words: (->
  #   return DS.PromiseObject.create promise: 
  #     new Em.RSVP.Promise (resolve, reject) =>
  #       @component("word_select").then (c)->
  #         alert c
  #         c.get('words').then (ws)->
  #           resolve(ws)
  #   ).property()

  # words: ((key, value) ->
  #   if (arguments.length > 1) 
  #     return value;

  #   @get("components").then (cs) =>

  #     cs.toArray()[0].get('words').then (ws) =>
            
  #       @set('words', ws)

  #   return value
  # ).property()

  updateComponents: ->

    @get('components').then (cs)=>
      for c in cs.toArray()
        c.save()

  activities:  ((model, obj) ->
    @get('controllers.sections').get('activities')
    ).property('name')

  nextAct: (act) ->
    @hash().then (h)=>
      newActInd = h[act]
      @get('activities').then (acts)=>
        actsArray = acts.toArray()
        if act.get('completed') == false
          @trigger('delegate.increaseProgress', @, ->
            # console.log "COMPLETED"
          ) 
          act.set('completed', true)
          act.save()
        if newActInd < actsArray.length
          
          newAct = actsArray[newActInd].get('name')
          @transitionToRoute('activities',newAct)
        
        else  
          false
          # @get('controllers.sections').get('sectionDone').then (done)=>

          #   if done

          #     @get('controllers.sections').get('nextLevel')


 
  actions:
    
    updateContent: ->

    moveArrow: (element) ->
      @trigger('delegate.setArrow', @) 

    trans: (m)->
      @trigger('delegate.setArrow', @) 

    buttonClicked: (act)->
      if @has('buttonPressed')
        @trigger('buttonPressed', =>
          @nextAct(act)
        )
      else @nextAct(act)

    moveArrow: (element) ->
      console.log "MOVE ARROW"
      console.log @content.get("name")
      @set('hovering', @content);
      @trigger('delegate.setArrow', @) 

 
    goHere: (act) ->
      console.log("TRANS: " + act)
      if act != undefined
        @transitionToRoute('activities',act)

    hover: (item)->
      console.log "HOVER: " + item
      @set('hovering', item); 
      
    click: (item)->
      console.log "CLICK: " + item
      @set('hovering', item); 
