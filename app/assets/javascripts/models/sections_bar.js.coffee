Oli.SectionsBar = Ember.Object.extend({
  init: -> 
    e = @get('element')
    @set('numSections', e.siblings('.start-items').length)

    array = []
    for sect, i in e.siblings('.start-items')
      correction = 0

      s = $(sect)
      if i == 0
        correction = s.offset().left - s.parent().offset().left 
        console.log "cor:  " + correction
      array.push(s.outerWidth() + correction)

    @set('widthEachSection', array)
    @._super()


  elaement: null
  widthEachSection: []
  sectionsPerSection: []
  numSections: 3
  filledSections: 0
  currentSection: 0
  currentProgress: .25

  grow: ->
    e = @get('element')
    curSect = @get('currentSection')
    sectsPer = @get('sectionsPerSection')
    widthPer = @get('widthEachSection')
    grow = widthPer[curSect] / sectsPer[curSect] 
    e.animate({width: e.width() + grow + "px"});

})
