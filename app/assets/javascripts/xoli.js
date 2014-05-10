$(document ).ready(function() {
  var laddaLoadingButton = Ladda.create( document.querySelector( '.ladda-button' ) );

      $("#oli-form").submit(function() {
        laddaLoadingButton.start();
        $.ajax({
        url: '/landing',
        type: 'post',
        async: true,
        data: $("#oli-form").serialize(),
        dataType: 'script',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
        }
        }).done(function() {

        }).success(function(){
          laddaLoadingButton.stop();

        });
      return false;
      })
  });