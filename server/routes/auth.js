var authController = require('@/controller/authentication/authcontroller')
const passport = require('passport')

module.exports = function (app, passportAuth) {
  // Authentication routes
  // app.post('/api/login', authController.login)
  // app.post('/api/logout', authController.logout)
  app.post('/api/signup', authController.signup)
}
