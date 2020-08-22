var userController = require('@/controller/usercontroller')
const passport = require('passport')

module.exports = function (app, multer) {
  
  app.post('/api/user',
  passport.authenticate("jwt", { session: false }),
  userController.editUserDetails)
  
  app.post('/api/user/image',
  passport.authenticate("jwt", { session: false }),
  multer.single('file'),
  userController.uploadProfileImage)
    
  app.get('/api/user/me',
  passport.authenticate("jwt", { session: false }),
  userController.getMyDetails)
  
  app.get('/api/user/:handle',
  passport.authenticate("jwt", { session: false }),
  userController.getUserDetails)
}
