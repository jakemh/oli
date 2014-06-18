Oli.TipView = Em.View.extend
  didInsertElement: ->
    $("#tip-logo").on('mouseover', ->
      $('#tip-box').fadeIn("medium")
      $('.tip-text-preview').fadeOut("medium")

      )

    $("#tip-logo").on('mouseout', ->
      $('#tip-box').fadeOut()
      $('.tip-text-preview').fadeIn("medium")

      )

