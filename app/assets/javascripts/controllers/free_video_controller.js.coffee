Oli.FreeVideoController = Ember.ObjectController.extend Ember.Evented,
  
  notchBarLength: 1
  noHover: true
  displayNoArrow: true
  hovering: null

  handleVideoDispose: (player)->
