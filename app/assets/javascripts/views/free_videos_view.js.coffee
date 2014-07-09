Oli.FreeVideosView = Em.View.extend
  
  didInsertElement: ->
    if window.FB
      FB.XFBML.parse(document.getElementById("fb-comments"))

