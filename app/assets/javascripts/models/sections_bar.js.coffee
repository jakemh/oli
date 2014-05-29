Oli.SectionsBar = Ember.Object.extend({
  init: -> 
    e = @get('element')
    @set('remainingSectsPerSect', Ember.copy(@get('sectionsPerSection')))
    @set('numSections', e.siblings('.start-items').length)
    items = e.children('.start-items')
    array = []
    correction = 0

    for sect, i in items

      s = $(sect)
      s.children('.sections-progress-inner').addClass(@get('colors')[i])
      w = 0

      if i == 0
        correction = s.offset().left - s.parent().offset().left 
        console.log "cor:  " + correction
        w = s.outerWidth() + correction
      else if i == items.length - 1
        # alert()
        # correction = s.offset().left - s.parent().offset().left 
        console.log "cor:  " + correction
        w = s.parent().width() - s.position().left - correction
      else
        w = s.outerWidth()
      array.push(w)

    # alert(array)
    @set('widthEachSection', array)
    @._super()

  element: null
  widthEachSection: []
  sectionsPerSection: []
  remainingSectsPerSect: []
  numSections: 3
  filledSections: 0
  currentSection: 0
  currentProgress: .25

  grow: (section_num, callback) ->
    # alert(@get('element'))
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
    grow = Math.floor(widthPer[section_num] / sectsPer[section_num])
    fix = 0
    additionalOptions = {}
    if remainingSects[section_num] == 0 
      fix = widthPer[section_num] - (sectsPer[section_num] * grow)
      if (numberSects - 1) == section_num 
        additionalOptions['borderTopRightRadius'] = 100 + "px"
        additionalOptions['borderBottomRightRadius'] = 100 + "px"
        fix += 15
    #   bar.animate({width: currentSect * grow + fix + 15 + "px", borderTopRightRadius: 100 + "px", borderBottomRightRadius: 100 + "px"}, ->
    #   # console.log "GREW"
    #     callback()
    # );
    finalHash = $.extend({width: currentSect * grow + fix + "px"}, additionalOptions)
    console.log "FINAL: " + JSON.stringify finalHash
    bar.animate(finalHash, ->
      # console.log "GREW"
      callback()
    );

})
