Oli.CalendarView = Em.View.extend
  didInsertElement: -> 
    $("a").on("click", ->
      alert "CLICK"
      $('.actions-box').animate({ scrollTop: @.position.top() }, "slow");
      )

    $('#date-picker-field').datepicker({
      orientation: "top left"
      autoclose: true
    });

  dateChanged: (->
    @get('controller').actionDateChanged($('#date-picker-field').datepicker('getDate'))
    ).observes('controller.date')