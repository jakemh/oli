$(document ).ready(function() {
      $("#oli-form").submit(function() {
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
        });
      return false;
      })

  });