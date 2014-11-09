# This is a manifest file that'll be compiled into application.js, which will include all the files
# listed below.
#
# Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
#or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
#
# It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
# compiled file.
#
# Read Sprockets README (https:#github.com/sstephenson/sprockets#sprockets-directives) for details
# about supported directives.
#
#= require jquery
#= require jquery_ujs
#= require underscore
#= require bootstrap-sass-official/assets/javascripts/bootstrap-sprockets
#= require bootstrap-sass-official/assets/javascripts/bootstrap
#= require bootstrap-datepicker
#= require browser_selector
#= require select2
#= require moment
#= require add-this-event
#= require spin
#= require ladda.min
#= require oli-content
#= require handlebars
#= require frogaloop
#= require video-media-error
#= require jquery.highlighttextarea
#= require ember
#= require ember-data
#= require_self
#= require hoverintent.min
#= require oli
#= require app

window.Oli = Ember.Application.create({
  LOG_TRANSITIONS: true
  customEvents: {
    #key is the jquery event, value is the name used in views
    hoverIntent: 'hoverIntent',
    'hover': 'hover'
  }
});
Em.run.backburner.DEBUG = true
Em.TEMPLATES["skipActivity"] = Em.Handlebars.compile('''
  <div >
  <a href="#" {{action skipActivity content on="click"}}>Skip this</a>
  </div>
  '''
);
Em.TEMPLATES["status"] = Em.Handlebars.compile('{{view.status}}');
