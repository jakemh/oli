Oli.EmailFormView = Em.View.extend({
  didInsertElement: ->
    @set('controller.controllers.activities.buttonText', "Send")
    # @get('controller.controllers.activities').on("buttonPressed", @get('controller'), @get("controller").submitForm)


  components: (->
    @get('controller').get('components')
  ).property()
})