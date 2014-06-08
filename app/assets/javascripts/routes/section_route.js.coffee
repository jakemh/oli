Oli.SectionsRoute = Ember.Route.extend({
  setupController: (controller, model) ->
    controller.set('content', model);
  
  actions:
    willTransition: (transition)-> 
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

  afterModel: (m, transition) -> 
    console.log("TRANS: " + transition)

    if (transition.targetName == "sections.index") 
      @transitionTo("activities", "Intro")
    # else
      # @controller.get('sectionDone').then (done) =>
      #   @controller.notifyPropertyChange('hash')
      #   @controller.get('hash').then (h) =>
      #     paramIndex = h[transition.params.sections.section]
      #     currentIndex = h[@controller.content.get('name')]

  model: (params) -> 
    topic = @modelFor('topics')
    topic.get('sections').then (sections) ->
      for s in sections.toArray()
          return s if s.get('name') == params.section
    });


Oli.SectionsIndexRoute = Ember.Route.extend({
  afterModel: (m, transition) -> 
    if (transition.targetName == "sections.index") 
      @transitionTo("activities", "Intro")
});