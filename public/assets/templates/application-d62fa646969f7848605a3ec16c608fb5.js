Ember.TEMPLATES.application=Ember.Handlebars.template(function(e,t,s,a,l){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,Ember.Handlebars.helpers),l=l||{};var h,u,o="",p=s.helperMissing,r=this.escapeExpression;return l.buffer.push(r((h=s.outlet||t&&t.outlet,u={hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:l},h?h.call(t,"nav",u):p.call(t,"outlet","nav",u)))),l.buffer.push('\n<div class="course-wrapper">\n  '),l.buffer.push(r((h=s.outlet||t&&t.outlet,u={hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:l},h?h.call(t,"levels",u):p.call(t,"outlet","levels",u)))),l.buffer.push("\n  "),l.buffer.push(r((h=s.outlet||t&&t.outlet,u={hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:l},h?h.call(t,"bar",u):p.call(t,"outlet","bar",u)))),l.buffer.push("\n  "),l.buffer.push(r((h=s.outlet||t&&t.outlet,u={hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:l},h?h.call(t,"activity",u):p.call(t,"outlet","activity",u)))),l.buffer.push("\n</div>\n"),o});