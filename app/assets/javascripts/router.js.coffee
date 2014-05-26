# For more information see: http://emberjs.com/guides/routing/

Oli.Router.map ()->

  @route('course', {path: "/courses/*wildcard"})
  @resource('course', {path: "/courses/:id"}, -> 
    @resource('topics', {path: "/topics/:topic"}, ->
      @resource('sections', {path: "/sections/:section"}, ->
        @resource('activities', {path: "/activities/:activity"}))))


Oli.Router.reopen({
  location: 'history'
  rootURL: '/'
});

