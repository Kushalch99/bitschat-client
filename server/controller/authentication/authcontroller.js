const { defaultImageUrl } = require('../../constants');
const passport = require('@/controller/authentication/passport_auth.js').passport
const { body } = require('express-validator/check')
const db = require('@/sequelize').db
const { check, validationResult } = require('express-validator')
const Op = require('sequelize').Op

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
    // console.log(user)
    if(user == null)
      return registerUser(req, res)
    else
      return res.status(500).json({success: false, message: 'User already registered with given email or handle'})
  }
]

async function registerUser (req, res, roleId, UserTypeModel) {
  console.log(req.body)
  let passwordHash = db.User.generateHash(req.body.password)
  const newUser = {
    email: req.body.email,
    password: passwordHash,
    handle:req.body.handle,
    imageUrl: defaultImageUrl,
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
