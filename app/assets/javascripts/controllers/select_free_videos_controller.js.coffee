# Oli.FreeVideoController = Ember.ObjectController.extend Ember.Evented, Oli.Componentable,
#   needs: ["me"]

#   video: null

#   handleVideoDispose: (player)->
#     @set('video', player)

#   controlsOn: false

#   videos: (->
#     return DS.PromiseObject.create promise: 
#       new Em.RSVP.Promise (resolve, reject) =>
#         @store.find('activity', { template: "free_video" }).then (videos)->
#           resolve videos
#     ).property()

#   videosFormatted: (->
#     return DS.PromiseObject.create promise: 
#       new Em.RSVP.Promise (resolve, reject) =>
#         formattedObjs = []
#         @get('videos').then (vids)=>
#           count = vids.get('length')
#           for vid, i in vids.toArray()
#             do (vid, i, formattedObjs) =>
#               vid.get('components').then (comps)=>
#                 count -= 1
#                 description = comps.filterProperty("context", "free_video_preview")[0].get('content')
#                 formattedObjs.pushObject(
#                   id: vid.id
#                   index: i
#                   title: vid.get('name')
#                   description: description
#                   width: @get('width')
#                   height: @get('height')
#                   source: @get('videoSrc')
#                   )
#                 resolve formattedObjs if count == 0
#     ).property()

#   source: (->
#     return DS.PromiseObject.create promise: 
#       new Em.RSVP.Promise (resolve, reject) =>
#         @videoComp(@get('content')).then (vid)->
#           resolve '/videos/' + vid.get('data')

#     ).property()

#   videoData: (->
#       width: @get('width')
#       height: @get('height')
#       source: @get('videoSrc')
#     ).property()

#   width: "121"
#   height: "67"

#   actions:
#     goToVideo: (video)->
#       @transitionTo('free_video', video.index)