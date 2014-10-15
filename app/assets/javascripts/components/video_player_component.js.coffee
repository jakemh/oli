Oli.VideoPlayerComponent = Ember.Component.extend
  didInsertElement: ->
    $('#vimeoplayer').bind('DOMSubtreeModified', (e)=> 
      if (e.target.getAttribute('src').length > 0)
        $('#vimeoplayer').on("load", =>
          @srcUpdated()
          # $('#vimeoplayer').load(@srcUpdated) 
      )
    )

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
        # alert "P"
        return

      onFinish = (id) =>
        @set('finished', true)
        return
      

      # status = $(".status")
      player.addEvent "ready", ->
        # status.text "ready"
        player.addEvent "pause", onPause
        player.addEvent "finish", onFinish
        # player.addEvent "playProgress", onPlayProgress
        return

      # $("button").bind "click", ->
      #   player.api $(this).text().toLowerCase()
      #   return

      return
