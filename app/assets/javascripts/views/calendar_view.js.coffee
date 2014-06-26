Oli.CalendarView = Em.View.extend
  didInsertElement: -> 

    $('#date-picker-field').datepicker({
      orientation: "top left"
      autoclose: true
    });

  dateChanged: (->
    @get('controller').actionDateChanged($('#date-picker-field').datepicker('getDate'))
    ).observes('controller.date')