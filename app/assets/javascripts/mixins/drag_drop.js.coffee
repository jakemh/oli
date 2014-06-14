Oli.cancel = (event) ->
  event.preventDefault()
  false

Oli.Dragable = Ember.Mixin.create(
  attributeBindings: "draggable"
  draggable: "true"
  dragStart: (event) ->
    dataTransfer = event.originalEvent.dataTransfer
    dataTransfer.setData "Text", @get("elementId")

)

Oli.Droppable = Ember.Mixin.create(
  dragStart: (event) ->
    dataTransfer = event.originalEvent.dataTransfer
    viewId = event.originalEvent.dataTransfer.getData("Text")
    view = Ember.View.views[viewId]
    view.set("originalBox", @get('index'))

  dragOver: Oli.cancel
  drop: (event) ->
    viewId = event.originalEvent.dataTransfer.getData("Text")
    # alert event.originalEvent.dataTransfer.getData("index")
    view = Ember.View.views[viewId]
    deleteIndex = null
    oldList = @get('controller.lists')[view.get('originalBox')]
    newList = @get('controller.lists')[@get('index')]
    if oldList
      for word, i in oldList
        if word == view.value
          deleteIndex = i
          break

    oldList.removeAt(deleteIndex)
    newList.pushObject(view.value)
)
