Oli.BarView = Em.View.extend({

  didInsertElement: ->
    @get('controller').on('delegate.increaseProgress', @, @delegate.increaseProgress);
    # @get('controller.controllers.sections.activitiesPerSection').then (aps) =>
    #   @set('activitiesPerSection', aps)
    @get('drawBar')

  activitiesPerSection: null
  drawBar: (->
    @get('controller.controllers.sections.activitiesPerSection').then (aps)=>
      @get('controller').set('progress', Oli.SectionsBar.create({
            element: $('#sections-row-oli')
            colors: ["oli-yellow", "oli-orange", "oli-red"]
            sectionsPerSection: aps.map((item) -> item.length)
            completed: aps.map((item) -> item.completed)
            }))
  ).property()

  delegate:
    increaseProgress: (e, callback)->
      @get('controller').get('controllers.sections').get('sections').then (sects) =>
        firstID = sects.toArray()[0].id
        currentID = @get('controller').get('controllers.sections').content.id
        relID = currentID - firstID
        @get('controller').progress.grow(relID, callback)

  click: ->

    @get('controller').send('moveArrow', @);

  children: ->
    this.$().children()

  mouseLeave: ->
    $('#hover-box').stop().fadeOut("fast")
    # $(@children()[0]).stop().fadeOut("fast")
});

Oli.NotchView = Em.View.extend({
  classNameBindings: ['notchEmber'],
  notchEmber: true

  didInsertElement: ->
    # @.$().width(Math.floor($("#thin-bar").width() / @get('controller.activities').get('length')))
    actNum =  @get('controller.notchBarLength')
    totalWidth = $(".thin-bar-wrapper").innerWidth()
    newWidth = Math.floor(totalWidth / actNum)
    adj = totalWidth - (newWidth) * actNum
    @$().children('.notch').innerWidth(newWidth - 1)

    last = $('.notch-ember .notch').last()
    last.width(last.width() + adj)

    if @get('controller.noHover') != true
      @$().hoverIntent (=>
        oBox = @hoverBox().offset()
        oNotch = @$().offset()
        pBox = @hoverBox().position()
        pNotch = @$().position()
        if @hoverBox().is(":hidden")
          @hoverBox().stop().fadeIn("fast")
          @hoverBox().offset({top: oNotch.top, left:oNotch.left})
        else 
          @hoverBox().animate({top: pBox.top, left:pNotch.left })

        @get('controller').send('hover', @get('title'));
      ), ->
      # handled in BarView class

  click: ->
    @get('controller').send('goHere', @get('title').name);

  hoverBox: ->
    $('#hover-box')
    
});

Oli.TriangleView = Em.View.extend({
  classNameBindings: ["thinBarArrow", "displayNone:display-none"],
  thinBarArrow: true

  didInsertElement: ->
    if @get('controller.notchBarLength') > 1
      @get('controller').on('delegate.setArrow', @, @delegate.setArrow);
      @get('delegate.setArrow')(@get('controller'))

  displayNone: (->
    @get('controller.displayNoArrow') || false
    ).property()

  delegate:
    setArrow: (controller) ->
      triangle = $('#triangle')
      hash = controller.hash().then (h) => 

        oTri = triangle.offset()
        console.log("HASH: " + JSON.stringify(h))
        # console.log("CONT: " + controller.content)
        # alert controller.content
        # alert controller
        index = h[controller.get('notchBarContent')]
        thinBar = $('#thin-bar')
        oThin = thinBar.offset()
        hoverBox = $('#hover-box')
        bar = $('#thin-bar')
        notchLength = bar.children('.notch-ember').eq(0).width()
        if thinBar.length
          triangle.animate({
            top: oTri.top - oThin.top
            left: ((index - 1) * notchLength)
            })
      
});
