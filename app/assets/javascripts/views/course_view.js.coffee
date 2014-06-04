Oli.CourseView = Em.View.extend({
  classNameBindings: ['thinBarArrow'],
  thinBarArrow: true
  willAnimateIn: ->
    @$().css "opacity", 0
    return

  animateIn: (done) ->
    @$().fadeTo 500, 1, done
    return

  animateOut: (done) ->
    @$().fadeTo 500, 0, done
    return

  didInsertElement: ->
    @get('controller').on('delegate.clickedBox', @, @delegate.clickedBox);


  delegate:
    clickedBox: (t) -> 
      triangle = @.$()
      t.get('activities').then (acts)=>
        hash = t.get('hash').then (h) =>          
          oTri = triangle.offset()
          index = h[t.get('name')]
          thinBar = $('#thin-bar')
          oThin = thinBar.offset()
          hoverBox = $('#hover-box')
          bar = $a('#thin-bar')
          notchLength = bar.children('.notch-ember').eq(0).width()
          triangle.animate({
            top: oTri.top - oThin.top
            left: ((index - 1) * notchLength)
            })
      
});