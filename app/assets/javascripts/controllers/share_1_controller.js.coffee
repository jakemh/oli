Oli.Share1Controller = Ember.ObjectController.extend Ember.Evented, Oli.Componentable,
  needs: ["activities"]


  fb_message: (->
    @last_post("share_box_fb")
  ).property()

  name: "Discovering your values and honoring them fulfilled"
  title: ""
  type: "inneroli:completed"
  description: "Values represent a big part of who you are. Value respresent an essential..."
  caption: "getoli.com"
  link: "http://getoli.com"
  picture: "http://i.imgur.com/LXIqpaU.png"

  shareOnFacebook: (callback)->

    FB.api "/me/feed", "post",

      message: @get('fb_message.content')
      display: "modal"
      name: @get("name")
      title: @get('title')
      type: @get('type')
      description: @get('description')
      caption: @get('caption')
      link: @get('link')
      picture: @get('picture')
    , (response) ->
      if not response or response.error
      else
        callback()
      return

  facebookLogin: (content)->
    FB.login ((response) =>
      if response.authResponse
        console.log "Welcome!  Fetching your information.... "

        content()

      else
        console.log "User cancelled login or did not fully authorize."
      return
    ),
      scope: "publish_actions"
      return_scopes: true

    return

  submitForm: (callback) -> 
    @postToFacebook(callback)

  postToFacebook: (callback)->
    component = @component("share_box_fb")
    component.then (c) =>

      entry = @store.createRecord('entry', {
          post: @get('fb_message.content')
          component: c
        })
      c.get('entries').then (es)->
        es.pushObject(entry)
        entry.save()

    FB.login ((response) =>
      if response.authResponse
        console.log "Welcome!  Fetching your information.... "
        @shareOnFacebook(callback)

      else
        console.log "User cancelled login or did not fully authorize."
      return
    ),
      scope: "publish_actions"
      return_scopes: true

    