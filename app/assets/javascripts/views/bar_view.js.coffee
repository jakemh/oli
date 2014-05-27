Oli.BarView = Em.View.extend({

  didInsertElement: ->
    @get('controller').on('delegate.increaseProgress', @, @delegate.increaseProgress);
    

    @get('controller').set('progress', Oli.SectionsBar.create({
      element: $('#sections-progress')
      sectionsPerSection:  @get('controller').get('sectionsPerSection')
      }))
  
  delegate:
    increaseProgress: (e)->
      @get('controller').progress.grow()

  click: ->
    console.log(@get('controller').get('name'))
    @get('controller').send('moveArrow', @);

  children: ->
    this.$().children()

  mouseLeave: ->
    $(@children()[0]).stop().fadeOut("fast")
});

Oli.NotchView = Em.View.extend({
  classNameBindings: ['notchEmber'],
  notchEmber: true

  didInsertElement: ->
    this.$().hoverIntent (=>
      oBox = @hoverBox().offset()
      oNotch = this.$().offset()
      if @hoverBox().is(":hidden")
        @hoverBox().stop().fadeIn("fast")
        @hoverBox().offset({top: oNotch.top, left:oNotch.left})
      else 
        @hoverBox().animate({top: oBox.top, left:oNotch.left})

      @get('controller').send('hover', @get('context'));
    ), ->
      # handled in BarView class

  click: ->
    @get('controller').send('goHere', @get('context').get('name'));

  hoverBox: ->
    $('#hover-box')
    
});

Oli.TriangleView = Em.View.extend({
  classNameBindings: ['thinBarArrow'],
  thinBarArrow: true
  

  didInsertElement: ->
    @get('controller').on('delegate.setArrow', @, @delegate.setArrow);

  delegate:
    setArrow: (t) ->
      triangle = @.$()
      t.get('activities').then (acts)=>
        hash = t.get('hash').then (h) =>          
          oTri = triangle.offset()
          console.log("TEST: " + t.content)
          index = h[t.content]
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
