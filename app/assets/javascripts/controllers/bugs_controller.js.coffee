Oli.BugsController = Ember.ObjectController.extend Ember.Evented,
  input: ""
 

  modal: (->
    id: "bugModal"
    title: "Bug Report"
    text: "Please carefully describe the bug you have encountered and the steps that led to it."
    inputBool: true

    submit: =>
      bug = @store.createRecord('bug',
        description: @get('input')
        url: document.URL
        userAgent: navigator.userAgent


        )
      bug.save()
    ).property()
