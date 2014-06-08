Oli.EmailForm = Oli.Component.extend({
  email: DS.attr('string')
  subject: DS.attr('string')
  body: DS.attr('string')
  activity: DS.belongsTo('activity', {async: true})
  
});