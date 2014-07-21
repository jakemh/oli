Oli.AnimatedView = Ember.Mixin.create(
  classNames: ["animated-view"]
  willAnimateIn: ->
    @$().removeClass "slide-out-left"
    @$().addClass "slide-in-right"
    return

  animateIn: (done) ->

    @$el.addClass "animate"
    Ember.run.later this, (->
      @$el.removeClass "animate slide-in-right"
      done()
      return
    ), 300
    return

  willAnimateOut: ->

  animateOut: (done) ->
    $(".activity-contents").removeClass "animate slide-out-left"

    # @$el.addClass "animate slide-out-left"
    # Ember.run.later this, done, 300
    # return
)