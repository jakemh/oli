Oli.FreeVideoView = Em.View.extend
  
  didInsertElement: ->
    if window.FB
      FB.XFBML.parse(document.getElementById("fb-comments"))


Oli.MeFreeVideosView = Em.View.extend

  didInsertElement: ->

Oli.MeView = Em.View.extend()