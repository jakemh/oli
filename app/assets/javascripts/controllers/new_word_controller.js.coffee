Oli.NewWordController = Ember.ObjectController.extend(Ember.Evented,{
  needs: ['activities']
  currentWord: null

  focus: ->
    @trigger('becomeFocused')

  currentWordChanged: (->
  ).property('currentWord')
})