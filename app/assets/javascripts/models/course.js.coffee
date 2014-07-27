Oli.Course = DS.Model.extend
  name: DS.attr('string'),
  topics: DS.hasMany('topic', async:true)
  user: DS.belongsTo('user', async: true)
  completed: DS.attr('boolean')
