Oli.EmailFormView = Em.View.extend({
  didInsertElement: ->
    # @get('controllers.activities').on("buttonPressed", @, @submitForm)
    @get('controller.controllers.activities').on("buttonPressed", @get('controller'), @get("controller").submitForm)


  components: (->
    @get('controller').get('components')
  ).property()
})