# For more information see: http://emberjs.com/guides/routing/
Oli.Router.map ()->

  

  # @route('course', {path: "/courses/*wildcard"})
  @resource('welcome', ->
    @resource('free_video', {path: "/:id"})
    )

  @resource('users', ->
    @resource('users.logout', path: '/sign_out')
    )
  @resource('me', ->
    @resource('me.free_videos',path: '/free_videos')

    @resource('course_info')
    @resource('marketplace')
    @resource('resources')
    @resource('account')
  )

  @resource('pricing')
  @resource('about')
  @resource('blog')
  @resource('contact')

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


Oli.Router.reopen
  location: 'history'


