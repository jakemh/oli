Oli.UserFormComponent = Ember.Component.extend(
  actions:
    submit: ->
      @sendAction "submit",
        email: @get("email")
        subject: @get("subject")

      return

    cancel: ->
      @sendAction "cancel"
      return
)