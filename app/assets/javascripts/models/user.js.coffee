
Oli.User = DS.Model.extend
  name: DS.attr('string')
  photo: DS.attr('string')
  role: DS.attr('string')
  accountType: (->
    console.log @get('role')
    if @get('isFree') == true
      "Free user"
    else 
      @get('role')
    ).property()

  isFree: (->
    if @get('role') != "admin" && @get('role') != "super_admin" || @get('role')== "" || !@get('role') || @get('role') == null
        return true
    ).property()