Oli.FreeVideosView = Em.View.extend
  
  didInsertElement: ->

    # @get('controller.controllers.activities').on("buttonPressed", @get('controller'), @get("controller").submitForm)
  
    fbAppId = 1452435865004111
    obj = "http://getoli.com"

    window.fbAsyncInit = ->
      FB.init
        appId: fbAppId 
        status: true
        cookie: true 
        xfbml: true 
        version: "v2.0" 

      return

    ((d, s, id) ->
      js = undefined
      fjs = d.getElementsByTagName(s)[0]
      return  if d.getElementById(id)
      js = d.createElement(s)
      js.id = id
      js.src = "//connect.facebook.net/en_US/sdk.js"
      fjs.parentNode.insertBefore js, fjs
      return
    ) document, "script", "facebook-jssdk"

    ((d, s, id) ->
      js = undefined
      fjs = d.getElementsByTagName(s)[0]
      return  if d.getElementById(id)
      js = d.createElement(s)
      js.id = id
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0"
      fjs.parentNode.insertBefore js, fjs
      return
    ) document, "script", "facebook-jssdk"
      
