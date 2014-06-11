# Oli.EmailFormController = Ember.ObjectController.extend Oli.Componentable,
#   needs: "activities"

#   init: ->
#     @get('controllers.activities').on("buttonPressed", @, @submitForm)

#   saveHelper: (typeComponent, typeEntry)->
#     @component.then (a)=>
#       entry1 = @get('store').createRecord('entry', {
#           component: a
#           post: @get(typeEntry).get('content')
#         })
#       a.get('entries').then (ues)=>
#         ues.pushObject(entry1)
#         entry1.save()

#   submitForm: ->
#     @saveEntry("email_address", @get("addressEntry.post"))
#     @saveEntry("email_subject",  @get("subjectEntry.post"))
#     @saveEntry("email_body", @get("bodyEntry.content"))

#     $.ajax(
#       url: "/send_mail"
#       type: "POST"
#       dataType: "json"
#       data: $.param(
#         to: @get("addressEntry.post")
#         subject: @get("subjectEntry.post")
#         body: @get("bodyEntry.content")
#       )
#     ).then (response) ->
#       alert response
#       return

#   addressEntry: (->
#       @last_entry('email_address')
#     ).property()

#   subjectEntry: (->
#       @last_entry('email_subject')
#     ).property()

#   bodyEntry: (->
#       @last_entry('email_body')
#     ).property()