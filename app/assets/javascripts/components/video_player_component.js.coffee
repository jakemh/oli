Oli.VideoPlayerComponent = Ember.Component.extend
  didInsertElement: ->
    $('#vimeoplayer').bind 'DOMSubtreeModified', (e) => 
      if (e.target.getAttribute('src').length > 0)
        $("#vimeoplayer").load(@srcUpdated)
    # $('#vimeoplayer').on("load", (target)=>
    #   if $("#vimeoplayer").attr('src').length > 0
    #     alert "TARG: " + target
    #     @srcUpdated() 
    # )
    #   # )

  srcChange: (->
  
    ).observes('source')

  finished: null

  finChange: (->
    @get('parentView.controller.videoFinished').call(@get('parentView.controller'))
    ).observes("finished")
  
  srcUpdated: ->
    $ =>
      # Call the API when a button is pressed
      iframe = $("#vimeoplayer")[0]

      player = $f(iframe)
      onPause = (id) =>
        alert "P"
        return

      onFinish = (id) =>
        alert "F"
        # @set('finished', true)
        return
      
      # status = $(".status")
      player.addEvent "ready", ->
        # status.text "ready"
        player.addEvent "pause", onPause
        player.addEvent "finish", onFinish
        # player.addEvent "playProgress", onPlayProgress
        return

      return
