Oli.EmailFormController = Oli.ActivityBaseController.extend
  
  setup: ->
    @_super()
    @last_post('email_address').then (entry) =>
      if entry
        @set("addressEntry", entry)

    @last_post('email_subject').then (entry) =>
      if entry
        @set("subjectEntry", entry)

    @last_post('email_body').then (entry) =>
      if entry
        @set("bodyEntry", entry)

    @registerInputs(=>
      ["addressEntry", "subjectEntry", "bodyEntry"]
    )

  submitForm: (callback)->
    laddaLoadingButton = Ladda.create( document.querySelector('.ladda-button' ) );
    laddaLoadingButton.start();

    @saveEntry("email_address", @get("addressEntry"))
    @saveEntry("email_subject",  @get("subjectEntry"))
    @saveEntry("email_body", @get("bodyEntry"))
    $.ajax(
      url: "/send_mail"
      type: "POST"
      dataType: "json"
      data: $.param(
        to: @get("addressEntry")
        subject: @get("subjectEntry")
        body: @get("bodyEntry")
      )
    ).always (response) ->
      laddaLoadingButton.stop();

      callback()

      return

  validate: ->
    pass = true
    @validateInputs((inputStatus) =>
      pass = false if !inputStatus
    )

    if pass
      @allowContinue()
    else 
      @preventContinue()
  

  addressEntry: null
  subjectEntry: null
  bodyEntry: null

  # addressEntry: (->
  #     @last_post('email_address')
  #   ).property()

  # subjectEntry: (->
  #   @last_post('email_subject')
  #   ).property()

  # bodyEntry: (->
  #     @last_post('email_body')
  #   ).property()