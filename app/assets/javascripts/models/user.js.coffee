Oli.User = DS.Model.extend
  name: DS.attr('string')
  photo: DS.attr('string')
  role: DS.attr('string')
  courses: DS.hasMany('course', async: true)
  
  accountType: (->
    if @get('isFree') == true
      "Free user"
    else 
      @get('role')
    ).property('role')

  isFree: (->
    if @get('role') != "customer" && @get('role') != "admin" && @get('role') != "super_admin" || @get('role')== "" || !@get('role') || @get('role') == null
        return true
    ).property('role')