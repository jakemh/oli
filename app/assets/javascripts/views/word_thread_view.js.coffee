Oli.Box = Ember.View.extend Oli.Dragable,
  value: null
  originalBox: null

Oli.DropTarget = Ember.View.extend Oli.Droppable,
  index: null

  makeActive: ->
    if not @$().hasClass('drag-active')
      @$().addClass('drag-active')

  makeUnactive: ->
    if @$().hasClass('drag-active')
      @$().removeClass('drag-active')