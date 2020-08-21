const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { User} = require('@/sequelize').db
const db = require('@/sequelize').db


module.exports.initPassport = function (app) {
  app.use(passport.initialize());
  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
    function (jwtPayload, done) {
      console.log(jwtPayload)
      return done(null, jwtPayload);
      // find the user in db if needed.
      // This functionality may be omitted if you store everything you'll need in JWT payload.
    }
  ));

  passport.use('adminlocal',
    new LocalStrategy(
      {
        usernameField: 'id',
        passwordField: 'id',
        session: false
      },
      async (id, _req, done) => {
        var user = await User.findOne(
          {
            where: { id: id },
          })
        if (!user) {
          // UserId doesn't exist
          return done(null, false, { message: "User Doesn't Exist" })
        }
        done(null, { id: user.id, email: user.email, imageUrl: user.imageUrl})
      }
    )
  )

  passport.use('local',
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false
      },
      async (email, password, done) => {
        var user = await User.findOne(
          {
            where: { email: email },
          })
        if (!user) {
          // Username doesn't exist
          return done(null, false, { message: 'Incorrect email or password' })
        }
        if (!user.validPassword(password)) {
          // Password doesn't match
          return done(null, false, { message: 'Incorrect email or password' })
        }
        if (user.isVerified != 1) {
            return done(null, false, { resend_email: true, message: 'Email is not Verified' })
        }
        // Successful login
        done(null, { id: user.id, email: user.email, imageUrl: user.imageUrl });
      }
    )
  )
}

module.exports.passport = passport
