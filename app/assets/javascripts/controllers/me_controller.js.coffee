Oli.MeController = Ember.ObjectController.extend Ember.Evented,
  queryParams: ['test']
  test: null
  hash: ->
    new Em.RSVP.Promise (resolve, reject) =>
      hash = {}
      for item, index in @get('barContent')
        hash[item.name] = index + 1
        
      resolve hash

 

  user: (->
    return DS.PromiseObject.create promise: 
      new Em.RSVP.Promise (resolve, reject) =>
        @store.find('user').then (users)->
          resolve users.get('firstObject')
    ).property()

  closeModal: ->
    frame = $('#video-iframe')
    src = frame.attr('src')
    frame.attr('src', '')
    frame.attr('src', src)

  accountLevel: (->
    @get('user.accountType')
    ).property()

  paid: (->
    !@get('content.isFree')
    ).property('content.isFree')

  notchBarLength: (->
    @get('barContent.length')
    ).property('barContent')

  notchBarContent: null
  
  noHover: true
  displayNoArrow: false
  hovering: null
  notchGap: false

  barContent: (->
    if @get("paid") == true
      @get('barContentPaid')
    else
      @get('barContentFree')
    ).property('content.role')

  barContentFree: (->
    [
      {displayName: "Free Videos", name: "me.free_videos", class: "oli-yellow"}, 
      {displayName: "Account", name: "account", class: "oli-red"}
    ]
    ).property()

  barContentPaid: (->
    [
      {displayName: "Course Info", name: "course_info", class: "oli-yellow"}, 
      {displayName: "Resources", name: "resources", class: "oli-orange"}
      {displayName: "Marketplace", name: "marketplace", class: "oli-red"}
      {displayName: "Account", name: "account", class: "oli-blue"}
    ]
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
        @transitionToRoute(act)
