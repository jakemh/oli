Oli.AcknowledgementController = Ember.ObjectController.extend Ember.Evented, Oli.Componentable,
  needs: ["me"]
  input: null

  setContent: (type)->
    if type == "acknowledgement"
      @set('content', @get('ack'))
    else if type == "gratitude"
      @set('content', @get('grat'))
    else if type == "quote"
      @set('content', @get('quote'))


  ack: (-> 
    type: "Acknowlegement"
    typeLower: "acknowlegement"
    typePlural: "acknowlegements"
    title: "Daily Acknowlegement"
    subtext: "Record an acknowledgement today!"
    placeholder: "I acknowledge that I..."

    ).property()

  grat: (-> 
    type: "Gratidude"
    typeLower: "gratitude"
    typePlural: "gratitudes"
    title: "Daily Gratitude"
    subtext: "Record an gratitude today!"
    placeholder: "I am grateful for..."
    ).property()

  quote: (->
    title: "Daily OLI"

    text: '''
      Our deepest fear is that we are powerful beyond measure. 
      It is our light, not our darkness that most frightens us. 
      We ask ourselves, Who am I to be brilliant, gorgeous, talented, 
      and fabulous? Actually, who are you not to be?
      '''
    author: "Marianne Williamson"
    ).property()

  buttonDisabled: (->
    if @get('input') != null && @get('input') != ""
      return false
    return true
    ).property("input")

  saveEntry: (type)->
    @commitBasicEntry(type, @get('input'))
    # @set('input', null)

