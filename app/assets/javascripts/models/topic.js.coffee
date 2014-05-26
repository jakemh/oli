Oli.Topic = DS.Model.extend({
  name: DS.attr('string'), 
  course: DS.belongsTo('course',  {async: true}),
  sections: DS.hasMany('section', {async: true})
});