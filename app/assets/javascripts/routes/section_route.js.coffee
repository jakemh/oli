Oli.SectionsRoute = Ember.Route.extend
  setupController: (controller, model) ->
    # validations = Oli.Validations.create()
    controller.set('content', model)
    # validations.sectionReady(controller, model).then (response)=>
      # if !response.success
      #   sectionID = response.sectionID
      #   previousSectionID = Math.max(0,sectionID - 2)
      #   section = controller.get('sections').objectAt(previousSectionID)
        # @handleValidationTransition(section.get("name"))
        # @transitionTo('sections', section.get("name"))
    

  actions:
    willTransition: (transition)-> 
      alert "WILL TRANSITION"

    didTransition: ->
      alert "DID TRANSITION"

      # @controller.get('sectionDone').then (done)=>
      #   @controller.notifyPropertyChange('hash')
      #   @controller.get('hash').then (h) =>
          # paramIndex = h[transition.params.sections.section]
          # currentIndex = h[@controller.content.get('name')]
          # browsing to url
          # clicking on link
        #   if currentIndex 

        # # if section for param is not ready
        #   # if not 
        #   if not @controller.get('ready') # and previous level not done
        #     @transitionTo("activities", "Level 1", "Start")
        #     # transition.abort()
            # window.history.back()
  beforeModel: (transition) ->



  afterModel: (model, transition) -> 
    # alert "sect"
    

    console.log("aftermodel: " + transition)
    if (transition.targetName == "sections.index") 
      if model.get('name') == "Level 1"
        @transitionTo("activities", "Intro")
      else if model.get('name') == "Level 2"
        @transitionTo("activities", "Intro - Describe a 10")
      else if model.get('name') == "Level 3"
        @transitionTo("activities", "Intro - Brainstorm")

  model: (params) -> 
    topic = @modelFor('topics')

    topic.get('sections').then (sections) ->
      for s in sections.toArray()
          return s if s.get('name') == params.section

          

Oli.SectionsIndexRoute = Ember.Route.extend({
 afterModel: (model, transition) -> 
   console.log("TRANS: " + transition)
   if (transition.targetName == "sections.index") 
     if model.get('name') == "Level 1"
       @transitionTo("activities", "Intro")
     else if model.get('name') == "Level 2"
      @transitionTo("activities", "Intro - Describe a 10")
     else if model.get('name') == "Level 3"
       @transitionTo("activities", "Take Action!")
});