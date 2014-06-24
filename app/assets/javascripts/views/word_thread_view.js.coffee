Oli.WordThreadView = Ember.View.extend
  placeHolder: "Testing"


Oli.BoxView = Ember.View.extend Oli.Dragable,
  value: null
  originalBox: null
  originalView: null

Oli.DropTarget = Ember.View.extend Oli.Droppable,
  index: null
  classNameBindings: ["hasWord:drop-box-not-empty"]

  hasWord: (->
    list =  @get('controller.lists')[@get('index')]
    if list
      filteredList = list.filterProperty('selected', true)
      if filteredList.get('length') > 0
        return true
      else 
        false
    ).property("controller.lists.@each")

  makeActive: ->
    if not @$().hasClass('drag-active')
      @$().addClass('drag-active')

  makeUnactive: ->
    if @$().hasClass('drag-active')
      @$().removeClass('drag-active')