Oli.BrainstormItemView = Em.View.extend
  didInsertElement: -> 
    $("select.thread-dropdown").select2({
        containerCssClass: "oli-selector-large"
      });