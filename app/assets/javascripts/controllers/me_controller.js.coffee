Oli.MeController = Ember.ObjectController.extend Ember.Evented,
  hash: (->
    {"videos" : 1, "account" : 2}
    ).property() 

  hash: ->
    new Em.RSVP.Promise (resolve, reject) =>
      resolve {"free_videos":1, "account":2}

  user: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @store.find('user').then (users)->
          resolve users.get('firstObject')
    ).property()

  notchBarLength: 2
  noHover: false
  displayNoArrow: false
  hovering: null

  barContent: (->
    [{name: "free_videos"}, {name: "account"}]
    ).property()

  

  actions:

    trans: (m)->
      @trigger('delegate.setArrow', @) 

    hover: (item)->
      @set('hovering', {completed: false, name: item.name}); 
      
    click: (item)->
      @set('hovering', {completed: false, name: item.name}); 

    goHere: (act) ->
      if act != undefined
        @transitionToRoute('me',act)
