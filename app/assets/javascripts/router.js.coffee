# For more information see: http://emberjs.com/guides/routing/

Oli.Router.map ()->

  

  # @route('course', {path: "/courses/*wildcard"})
  @resource('welcome', ->
    @resource('free_video', {path: "/:id"})
    )
  @route('home', {path: "/home/"})

  @resource('me', ->
    @resource('me', path: "/:opt")
    @resource('free_videos', ->
      @resource('free_videos_select', path: "/:id")
    )
    @resource('course_info')
    @resource('marketplace')
    @resource('resources')
    @resource('account')
  )

  # @resource('meIndex', {path: "/me"})
  # @resource('me', {path: "/me/:location"}, ->
  #   @resource('free_videos_index')
  #   @resource('free_videos', {path: "/:id"})
  #   @route('account', {path: "/account/"})
  # )

  @resource('courses', {path: "/courses/:id"}, -> 
    @resource('topics', {path: "/topics/:topic"}, ->
      @resource('sections', {path: "/sections/:section"}, ->
        @resource('activities', {path: "/activities/:activity"}))))



Oli.Router.reopen({
  location: 'history'
  rootURL: '/'
});

