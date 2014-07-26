Oli.SectionsBar = Ember.Object.extend({
  init: -> 
    e = @get('element')
    @set('remainingSectsPerSect', Ember.copy(@get('sectionsPerSection')))
    @set('numSections', e.siblings('.start-items').length)
    items = e.children('.start-items')
    array = []

    for sect, i in items


      s = $(sect)
      s.children('.sections-progress-inner').addClass(@get('colors')[i])
      w = 0

      if i == 0
        # correction = s.offset().left - s.parent().offset().left 
        # console.log "cor:  " + correction
        w = s.outerWidth()
      else if i == items.length - 1
        # correction = s.offset().left - s.parent().offset().left 
        w = s.parent().width() - s.position().left
      else
        w = s.outerWidth()
      array.push(w)

    @set('widthEachSection', array)

    for sect, j in items
      if @get('completed')[j] > 0
        for item in [@get('completed')[j]..1]
          @grow(j, false)
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
  
  grow: (section_num, animate) ->
    if !@get('growDisabled')

      e = @get('element').children('.start-items').eq(section_num)
      bar = e.find('.sections-progress-inner')
      # e = @get('element').children('.start-items').children('.sections-progress-inner')
      # curSect = @get('currentSection')
      sectsPer = @get('sectionsPerSection')
      numberSects = sectsPer.length
      remainingSects = @get('remainingSectsPerSect')
      remainingSects[section_num] -= 1
      currentSect = sectsPer[section_num] - remainingSects[section_num]
      console.log("INC: " +  remainingSects)
      widthPer = @get('widthEachSection')
      actualInc = widthPer[section_num] / sectsPer[section_num]
      grow = Math.floor(actualInc)
      fix = 0
      additionalOptions = {}
      if remainingSects[section_num] == 0 

        diff = actualInc - grow

        fix = diff * sectsPer[section_num] += 7
        # fix = widthPer[section_num] - (sectsPer[section_num] * grow)
        if (numberSects - 1) == section_num 
          additionalOptions['borderTopRightRadius'] = 100 + "px"
          additionalOptions['borderBottomRightRadius'] = 100 + "px"
          fix -=1

          if !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
            fix += 1
          

      #   bar.animate({width: currentSect * grow + fix + 15 + "px", borderTopRightRadius: 100 + "px", borderBottomRightRadius: 100 + "px"}, ->
      #   # console.log "GREW"
      #     callback()
      # );
      hash = {width: currentSect * grow + fix + "px"}
      finalHash = $.extend({width: currentSect * grow + fix + "px"}, additionalOptions)
      console.log "FINAL: " + JSON.stringify finalHash
      if animate != false
        bar.animate(finalHash, ->
          # console.log "GREW"
          # callback()
        );
      else 
        bar.css(finalHash)

})
