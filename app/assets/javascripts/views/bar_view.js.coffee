Oli.BarView = Em.View.extend({

  didInsertElement: ->
    # console.log "NOT LIKELY: " + @get('childViews')[0]

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

  # mouseEnter: ->
  #   oBox = @hoverBox().offset()
  #   oNotch = this.$().offset()
  #   if @hoverBox().is(":hidden")
  #     @hoverBox().stop().fadeIn("fast")
  #     @hoverBox().offset({top: oNotch.top, left:oNotch.left})
  #   else 
  #     @hoverBox().animate({top: oBox.top, left:oNotch.left}, "slow")

  #   @get('controller').send('hover', @get('context'));

  click: ->

    @get('controller').send('goHere', @get('context').get('name'));

  hoverBox: ->
    $('#hover-box')
    
});

Oli.TriangleView = Em.View.extend({
  classNameBindings: ['thinBarArrow'],
  thinBarArrow: true
  

  didInsertElement: ->
    @get('controller').on('delegate.clickedBox', @, @delegate.clickedBox);
    @get('controller').on('delegate.setArrow', @, @delegate.setArrow);


  delegate:
    setArrow: (t) ->
      console.log("TRI: " + t)
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

    # clickedBox: (t) -> 
    #   triangle = @.$()
    #   t.get('activities').then (acts)=>
    #     hash = t.get('hash').then (h) =>          
    #       oTri = triangle.offset()
    #       index = h[t.get('name')]
    #       thinBar = $('#thin-bar')
    #       oThin = thinBar.offset()
    #       hoverBox = $('#hover-box')
    #       bar = $('#thin-bar')
    #       notchLength = bar.children('.notch-ember').eq(0).width()
    #       triangle.animate({
    #         top: oTri.top - oThin.top
    #         left: ((index - 1) * notchLength)
    #         })
      
});
