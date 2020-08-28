const { defaultImageUrl } = require('../../constants');
const passport = require('@/controller/authentication/passport_auth.js').passport
const { body } = require('express-validator/check')
const db = require('@/sequelize').db
const { check, validationResult } = require('express-validator')
const Op = require('sequelize').Op
const jwt = require('jsonwebtoken');

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return `${msg}`;
};


exports.signup = [
  body('email').isEmail(),
  body('handle').exists(),
  body('password').exists().isLength({min: 6}),
  async function (req, res, next) {
    const errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() })
    }
    let user  = await db.User.findOne({
      where: 
      {
        [Op.or]: [ {email: req.body.email}, {handle: req.body.handle} ]
      }
    })
    if(user == null)
      return registerUser(req, res)
    else{
      console.log('User already registered')
      return res.status(500).json({success: false, message: 'User already registered with given email or handle'})
    }
  }
]

async function registerUser (req, res) {
  console.log(req.body)
  let passwordHash = db.User.generateHash(req.body.password)
  const newUser = {
    email: req.body.email,
    password: passwordHash,
    handle:req.body.handle,
    profileImageUrl: defaultImageUrl,
    isVerified: 1
  }
  try {
      await db.User.create(newUser)
      res.status(200).send({success: true, message: 'User Successfully registered'})
  } catch (err) {
    console.log(err)
    return res.status(400).json({ success: false })
  }
}

exports.login = function (req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    // Decide what to do on authentication
    console.log(user)
    if (err || !user) {
      return res.status(400).json(info);
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.status(400).send({ err });
      }
      var payload = {
        id: user.id,
        email: user.email,
        handle: user.handle
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      console.log({payload,token})
      return res.status(200).json({ payload, token });
    });

  })(req, res, next);
}
exports.logout = function (req, res) {
  req.logout();
  return res.send();
}
