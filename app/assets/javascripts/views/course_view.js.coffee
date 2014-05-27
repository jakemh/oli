Oli.CoursView = Em.View.extend({
  classNameBindings: ['thinBarArrow'],
  thinBarArrow: true
  

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
          bar = $('#thin-bar')
          notchLength = bar.children('.notch-ember').eq(0).width()
          triangle.animate({
            top: oTri.top - oThin.top
            left: ((index - 1) * notchLength)
            })
      
});