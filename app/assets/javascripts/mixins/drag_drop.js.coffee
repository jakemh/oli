Oli.cancel = (event) ->
  event.preventDefault()
  false

Oli.Dragable = Ember.Mixin.create(
  attributeBindings: "draggable"
  draggable: "true"
  dragStart: (event) ->
    dataTransfer = event.originalEvent.dataTransfer
    dataTransfer.setData "Text", @get("elementId")
    return
)
Oli.Droppable = Ember.Mixin.create(
  dragEnter: Oli.cancel
  dragOver: Oli.cancel
  drop: (event) ->
    viewId = event.originalEvent.dataTransfer.getData("Text")
    view = Ember.View.views[viewId]
    @get('controller.lists')[@get('index')].pushObject(view.value)
    view.destroy()
)
