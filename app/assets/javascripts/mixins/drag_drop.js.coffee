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
    view.set("originalView", @)


  dragOver: Oli.cancel

  dragEnter: (event)->
    @makeActive()
    @notifyPropertyChange("hasWord")

    # console.log @get('index')
    viewId = event.originalEvent.dataTransfer.getData("Text")
    view = Ember.View.views[viewId]
    # if view
    #   if @get('index') != view.get('originalBox')
    #     alert("ENTER")

  dragLeave: (event)->
    # event.preventDefault()

    @makeUnactive()


  drop: (event) ->
    viewId = event.originalEvent.dataTransfer.getData("Text")
    # alert event.originalEvent.dataTransfer.getData("index")
    view = Ember.View.views[viewId]
    deleteIndex = null
    oldList = @get('controller.lists')[view.get('originalBox')]
    newList = @get('controller.lists')[@get('index')]
    if oldList
      for word, i in oldList.toArray()
        if word == view.value
          deleteIndex = i
          break

    @makeUnactive()
    @notifyPropertyChange("hasWord")
    @notifyPropertyChange("controller.listChanges")
    @get("controller").listChanges()

    view.get('originalView').notifyPropertyChange("hasWord")
    oldList.removeAt(deleteIndex)
    newList.pushObject(view.value)


    if typeof oldList.save == 'function'
      oldList.save()
    # alert typeof newList.save
    if typeof newList.save == 'function'
      @get('controller').handleWordDrop(newList)
    else 
      box = @get('controller.store').all('box').get('lastObject')
      view.value.set('box', box)
      # oldList.save()
      # view.value.save()

)
