Oli.EmailFormController = Ember.ObjectController.extend Oli.Componentable,
  needs: "activities"

  # init: ->
    # @get('controllers.activities').on("buttonPressed", @, @submitForm)

  submitForm: ->
    alert "SUBMIT"
    @saveEntry("email_address", @get("addressEntry.content"))
    @saveEntry("email_subject",  @get("subjectEntry.content"))
    @saveEntry("email_body", @get("bodyEntry.content"))

    $.ajax(
      url: "/send_mail"
      type: "POST"
      dataType: "json"
      data: $.param(
        to: @get("addressEntry.content")
        subject: @get("subjectEntry.content")
        body: @get("bodyEntry.content")
      )
    ).then (response) ->
      alert response
      return

  addressEntry: (->
      @last_post('email_address')
    ).property()

  subjectEntry: (->
    @last_post('email_subject')
    ).property()

  bodyEntry: (->
      @last_post('email_body')
    ).property()