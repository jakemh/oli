Oli.UsersLogoutRoute = Ember.Route.extend Ember.Evented,
  
  afterModel: (model) ->
    $.ajax(
      url: "/users/sign_out"
      type: "DELETE"
      dataType: "json"
    ).always (response) ->
      window.location.href = "/users/sign_in"

  model: ->
    @store.find('user').then (users)->
      users.get('firstObject')
