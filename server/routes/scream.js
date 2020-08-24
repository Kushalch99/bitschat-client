const screamController = require('@/controller/screamcontroller.js')
const passport = require('passport')


module.exports = function (app) {
  // Scream routes
  app.get('/api/scream/all',
  passport.authenticate("jwt", { session: false }),
  screamController.getAllScreams)
  
  app.get('/api/scream/me',  
  passport.authenticate("jwt", { session: false }),
  screamController.getMyScreams)
  
  app.get('/api/scream/:handle', 
  passport.authenticate("jwt", { session: false }),
  screamController.getUserScreams)
  
  app.post('/api/scream',
  passport.authenticate("jwt", { session: false }),
  screamController.postScream)
  
  app.post('/api/:screamId/like',
  passport.authenticate("jwt", { session: false }),
  screamController.likeScream)
  
  app.post('/api/:screamId/unlike',
  passport.authenticate("jwt", { session: false }),
  screamController.unlikeScream)
    
  app.post('/api/:screamId/comment',
  passport.authenticate("jwt", { session: false }),
  screamController.postComment)
  
}
