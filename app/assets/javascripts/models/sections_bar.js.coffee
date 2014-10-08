Oli.SectionsBar = Ember.Object.extend

  init: -> 
    # for i in @get("completed")
    e = @get('element')
    items = e.children('.start-items')

    #set key variables
    @set('remainingSectsPerSect', Ember.copy(@get('sectionsPerSection')))
    @set('numSections', e.siblings('.start-items').length)
    @set('widthEachSection', @widthEachSection(e, items))

    for sect, section_num in items
      @growToCurrent(section_num)

    @._super()

  element: null
  widthEachSection: []
  sectionsPerSection: []
  remainingSectsPerSect: []
  numSections: 3
  filledSections: 0
  currentSection: 0
  currentProgress: .25
  growDisabled: false
  
  growToCurrent: (section_num) ->
    if @get('completed')[section_num] > 0
      for completed_item in [@get('completed')[section_num]..1]
        @grow(section_num, false)

  widthEachSection: (e, items) ->
    array = []

    for sect, i in items
      s = $(sect)
      s.children('.sections-progress-inner').addClass(@get('colors')[i])
      w = 0

      if i == 0
        w = s.outerWidth()
      else if i == items.length - 1
        w = s.parent().width() - s.position().left
      else
        w = s.outerWidth()
      array.push(w)
    return array


  changeBase: (section_num) ->
    sectsPer = @get('sectionsPerSection')
   
    widthPer = @get('widthEachSection')
    actualInc = widthPer[section_num] / sectsPer[section_num]
    # grow = Math.floor(actualInc)
    return actualInc

  fix: (diff, remainingSects, section_num)->
    fix = 0

    if remainingSects == 0 
      sectsPer = @get('sectionsPerSection')
      numberSects = sectsPer.length
    
      fix = diff * sectsPer[section_num] += 7
  
      # last section
      if (numberSects - 1) == section_num 
      
        fix -=1

        if !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
          fix += 1
    return fix

  moveBar: (section_num, direction, animate) -> 
    if !@get('growDisabled')
      e = @get('element').children('.start-items').eq(section_num)
      bar = e.find('.sections-progress-inner')
      sectsPer = @get('sectionsPerSection')
      numberSects = sectsPer.length
      remainingSects = @get('remainingSectsPerSect')
      remainingSects[section_num] += direction
      currentSect = sectsPer[section_num] - remainingSects[section_num]
      additionalOptions = {}
      if remainingSects[section_num] == 0 

        # fix = widthPer[section_num] - (sectsPer[section_num] * grow)
        if (numberSects - 1) == section_num 
          additionalOptions['borderTopRightRadius'] = 100 + "px"
          additionalOptions['borderBottomRightRadius'] = 100 + "px"

      actualInc = @changeBase(section_num)
      grow = Math.floor(actualInc)
      diff = actualInc - grow
      fix = @fix(diff, remainingSects[section_num], section_num)
      finalHash = $.extend({width: currentSect * grow + fix + "px"}, additionalOptions)

      if animate != false
        bar.animate(finalHash, ->
        );
      else 
        bar.css(finalHash)

  shrink: (section_num, animate) ->
  
   @moveBar(section_num, 1, animate)

  grow: (section_num, animate) ->
    @moveBar(section_num, -1, animate)

