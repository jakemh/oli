$(document).ready(function() {

    // var swapToLogin = function(){
    //   $(".lnd__session").empty().
    // }

    // $("#sign-up-").submit(function() {
    //   laddaLoadingButton.start();
    //   $.ajax({
    //   url: '/users',
    //   type: 'post',
    //   async: true,
    //   data: $("#new_user").serialize(),
    //   dataType: 'script',
    //   beforeSend: function (xhr) {
    //     xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    //   }
    //   }).fail(function(error) {
    //     failAnimation();
    //     laddaLoadingButton.stop();

    //   }).success(function(){
    //     laddaLoadingButton.stop();
    //     successAnimation(function(){
    //       // window.location.href = "/welcome/1"

    //     });

    //   });
    // return false;
    // })


    // $('#register-modal').on('click', function(){
    //   window.location.href = "/me"
    // })

    $(".js-switch-to-login").on('click', function(e) {
        e.preventDefault()

        $(".js-sign-up-form").hide()
        $(".js-sign-in-form").show()

    })


    $(".js-switch-to-register").on('click', function(e) {
        e.preventDefault()

        $(".js-sign-in-form").hide()
        $(".js-sign-up-form").show()

    })
    $(".lnd__play-button").on("click", function(e) {
        if (window.videoPlaying != true) {
            window.videoPlaying = true;
            $(".lnd__video").fadeIn("slow", function() {
                $("#landing-video").get(0).play();


            });
        } else {
            $(".lnd__video").fadeOut("slow");
            $("#landing-video").get(0).pause();
            window.videoPlaying = false;
        }

        e.stopPropagation();

    })

    $(".lnd__intro-container").on("click", function() {
        if (window.videoPlaying != true) {

        } else {
            $(".lnd__video").fadeOut("slow");
            $("#landing-video").get(0).pause();
            window.videoPlaying = false;
        }
    })

    if ($(".oli-form-register .ladda-button").length > 0) {
        var laddaLoadingButton = Ladda.create(document.querySelector('.oli-form-register .ladda-button'));

        // var successAnimation = function(callback){
        //   var _this = $(".logo-flame")
        //   _this.addClass("success-animation");
        //   setTimeout(function() {
        //     _this.removeClass("success-animation")
        //     callback()
        //   }, 750);
        // }

        // var failAnimation = function(){
        //   var _this = $(".logo-flame")
        //   _this.addClass("fail-animation");
        //   setTimeout(function() {
        //     _this.removeClass("fail-animation")
        //   }, 2000);
        // }

        var successAnimation = function(callback) {

            setTimeout(function() {
                callback()
            }, 750);
        }

        var failAnimation = function() {

            setTimeout(function() {}, 2000);
        }
        if ($(".oli-form-register").length > 0) {

            $(".js-landing-register").submit(function() {

                laddaLoadingButton.start();
                $.ajax({
                    url: '/email',
                    type: 'post',
                    async: true,
                    data: $(".js-landing-register").serialize(),
                    dataType: 'script',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
                    }
                }).fail(function(error) {
                    alert(JSON.stringify(error))
                    failAnimation();
                    laddaLoadingButton.stop();

                }).success(function() {
                    laddaLoadingButton.stop();
                    successAnimation(function() {
                        $(".lnd-button").html("<i class=\"fa fa-check\"></i>")
                            // window.location.href = "/welcome/1"

                    });

                });
                return false;
            })
        }
    }
});