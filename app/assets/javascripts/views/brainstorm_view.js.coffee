Oli.BrainstormView = Em.View.extend
  didInsertElement: -> 
   

Oli.BrainstormItemView = Em.View.extend
  didInsertElement: -> 
 
  selections: null



Oli.BrainstormSelectView = Ember.Select.extend
  idVal: null
  item: null

  # set true after intial setup because ember sets selection array to [] on transition
  observeSelection: false

  selectionChange: (->

    if @get('selection') != null and @get('observeSelection')
      @get('item').selections.clear()
      for s in @get('selection')
        @get('item').selections.pushObject(s)
    ).observes('selection.@each')

  didInsertElement: ->
    $("select.thread-dropdown").select2({containerCssClass: "oli-selector-large"});

    @set('idVal', @$().attr('id'))
    @updateMultipleSelection()

  updateMultipleSelection: ->
    if @item.selections.length > 0
      for selection, i in @item.selections
        $('#' + @get('idVal') + " " + 'option[value="' + selection.value + '"]').attr('selected', 'selected')
        if i == @item.selections.length - 1
          $("select.thread-dropdown").select2({containerCssClass: "oli-selector-large"});
          @set('observeSelection', true)
    else 
      @set('observeSelection', true)

  contentChanged: (->
    setTimeout (=>
      @updateMultipleSelection()
    ), 100

    ).observes("content")
