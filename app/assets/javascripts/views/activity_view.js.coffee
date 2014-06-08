Oli.ActivityView = Em.View.extend({
  didInsertElement: -> 
    # alert @get('controller.controllers.sections.activitiesPerSection')

  test: "TESTING"
  willAnimateIn: ->
    @$().css "opacity", 0
    return

  animateIn: (done) ->
    @$().fadeTo 500, 1, done
    return

  animateOut: (done) ->
    @$().fadeTo 500, 0, done
    return
});

Oli.VideoView = Em.View.extend({
  didInsertElement: ->
    player = null

    player = videojs("MY_VIDEO_1", { "controls": true, "autoplay": false, "preload": "none" }, ->
      # this.play();
      self = this
      this.on('loadstart', =>
        self.ready(->
          console.log ("READY")
          # alert "READY"
        )
      )

    );
    @set('controller.video', player)
    @get('controller').set("status", "")

})
  
Oli.EmptyView = Em.View.extend({
  didInsertElement: ->
    @get('controller').set("status", "")
})
  
Oli.QuestionAnswerView = Em.View.extend({
  didInsertElement: ->
    @get('controller').set("status", "")

  components: (->
    @get('controller').get('components')
  ).property()
})
  

Oli.StatusView = Ember.View.extend({
  statusBinding: "controller.status"
})




Oli.RadioButton = Ember.Component.extend(
  tagName: "input"
  type: "radio"
  attributeBindings: [
    "name"
    "type"
    "value"
    "checked:checked"
  ]

  click: ->
    @set "selection", @$().val()
    return

  checked: (->
    @get("value") is @get("selection")
  ).property("selection")
)
Em.Handlebars.helper "radio-button", Oli.RadioButton