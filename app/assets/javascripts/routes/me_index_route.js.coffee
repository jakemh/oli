Oli.MeIndexRoute = Ember.Route.extend Ember.Evented,
  afterModel: (model, transition) -> 
    if (transition.targetName == "meIndex") 
      @transitionTo("me", "free_videos")
