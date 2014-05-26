$(document ).ready(function() {
  if ($(".ladda-button").length > 0){
    var laddaLoadingButton = Ladda.create( document.querySelector( '.ladda-button' ) );

        var successAnimation = function(){
          var _this = $(".logo-flame")
          _this.addClass("success-animation");
          setTimeout(function() {
            _this.removeClass("success-animation")
          }, 2000);
        }

        var failAnimation = function(){
          var _this = $(".logo-flame")
          _this.addClass("fail-animation");
          setTimeout(function() {
            _this.removeClass("fail-animation")
          }, 2000);
        }

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
          }).fail(function() {
            failAnimation();
            laddaLoadingButton.stop();

          }).success(function(){
            successAnimation();
            laddaLoadingButton.stop();

          });
        return false;
        })
     } 
  });