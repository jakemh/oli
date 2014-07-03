Oli.CalendarView = Em.View.extend
  didInsertElement: -> 
    $("#task-selector").select2({
        containerCssClass: "oli-selector"
      });
    
    $('#date-picker-field').datepicker({
      orientation: "top left"
      autoclose: true
    });

  dateChanged: (->
    @get('controller').actionDateChanged($('#date-picker-field').datepicker('getDate'))
    ).observes('controller.date')