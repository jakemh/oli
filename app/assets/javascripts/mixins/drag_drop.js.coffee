(->
  droppable = $(".drop-box")
  lastenter = undefined
  droppable.on "dragenter", (event) ->
    lastenter = event.target
    droppable.addClass "drag-over"
    return

  droppable.on "dragleave", (event) ->
    droppable.removeClass "drag-over"  if lastenter is event.target
    return

  return
)()

Oli.cancel = (event) ->
  # event.preventDefault()
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

  dragEnter: (event)->
    @makeActive()
    # console.log @get('index')
    viewId = event.originalEvent.dataTransfer.getData("Text")
    view = Ember.View.views[viewId]
    if view
      if @get('index') != view.get('originalBox')
        alert("ENTER")

  dragLeave: (event)->
    # event.preventDefault()

    @makeUnactive()

  drop: (event) ->
    viewId = event.originalEvent.dataTransfer.getData("Text")
    # alert event.originalEvent.dataTransfer.getData("index")
    view = Ember.View.views[viewId]
    deleteIndex = null
    @get('controller.lists')[view.get('originalBox')].then (oldList)=>
      @get('controller.lists')[@get('index')].then (newList)=>
        if oldList
          for word, i in oldList.toArray()
            if word == view.value
              deleteIndex = i
              break

        @makeUnactive()
        oldList.removeAt(deleteIndex)
        newList.pushObject(view.value)
        if typeof oldList.save == 'function'
          oldList.save()
        # alert typeof newList.save
        if typeof newList.save == 'function'
          newList.save()
        else 
          box = @get('controller.store').all('boxx').get('lastObject')
          view.value.set('boxx', box)
          # oldList.save()
          # view.value.save()

)