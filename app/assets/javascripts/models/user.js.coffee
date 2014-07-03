Oli.User = DS.Model.extend
  name: DS.attr('string')
  photo: DS.attr('string')
  role: DS.attr('string')
  accountType: DS.attr('string') 

  isFree: (->
    if !@get('accountType') or @get('accountType') == "" or @get('accountType') == "free"
      if @get('role') != "admin" && @role('role') != "super_admin"
        return true
    ).property()