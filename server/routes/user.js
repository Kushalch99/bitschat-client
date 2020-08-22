var userController = require('@/controller/usercontroller')
const passport = require('passport')

module.exports = function (app) {
  
  app.post('/api/user',
  passport.authenticate("jwt", { session: false }),
  userController.editUserDetails)
  
  // app.post('/user/image',
  // passport.authenticate("jwt", { session: false }),
  // userController.uploadProfileImage)
    
  app.get('/api/user/me',
  passport.authenticate("jwt", { session: false }),
  userController.getMyDetails)
  
  app.get('/api/user/:handle',
  passport.authenticate("jwt", { session: false }),
  userController.getUserDetails)
}
