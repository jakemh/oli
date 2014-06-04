Oli.ActivityView = Em.View.extend({

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
  


Oli.WordSelectionView = Em.View.extend({


  didInsertElement: ->

  willAnimateIn: ->
    @$().css "opacity", 0
    return

  animateIn: (done) ->
    @$().fadeTo 500, 1, done
    return

  animateOut: (done) ->
    @$().fadeTo 500, 0, done
    return

  isChecked: ->
    alert("CHECKED")
  test: ->
    alert("TEST")


  click: ->

 
  # words: (->
  #   @get('controller.words')
  # ).property

  selectedItems: (->
    if @get('controller.words')
      for w in @get('controller.words').toArray()
        w.get('test')

      selected = @get("controller.words").filterBy("selected", true).get("length")
  ).property('controller.words.@each.selected')

  selected: (->
    if @get('selectedItems') != undefined
      message = "Selected words: " + @get('selectedItems')
      @get('controller').set("status", message)

  ).property('controller.words.@each.selected')


  components: (->
    @get('controller').get('components')
  ).property()

  value: 0

});

Oli.WordView = Ember.View.extend({
  didInsertElement: ->

})

Oli.NewWordBox = Ember.TextField.extend({

  didInsertElement: ->
  cont: null
  theValue: null
  # component: (->
  #   if (arguments.length > 1) 
  #     return value;

  #   return null

  #   @get('cont.components').then (cs)=>
  #     @set('component', cs.toArray()[0])
  # ).property('component')

  valChanged: (->
    alert("TEST")
  ).property('value')

  keyDown: (e)->
    if(e.keyCode == 13)
      @get('cont.components').then (cs)=>
        component = cs.toArray()[0]
        newWord = @get('cont.store').createRecord('word', {
            word: @get('value'),
            component: component
            selected: true

          })
        component.get('words').pushObject(newWord)
        newWord.save()
       
    
})

Oli.NewWordCheck = Ember.Checkbox.extend({

})

Oli.StatusView = Ember.View.extend({
  statusBinding: "controller.status"
})

Oli.WordView = Ember.View.extend({
  didInsertElement: ->

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