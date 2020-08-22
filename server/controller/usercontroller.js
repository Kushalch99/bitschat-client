const { body,  query } = require('express-validator/check')
const db = require('@/sequelize').db
const { check, validationResult } = require('express-validator')

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return `${msg}`;
};

exports.editUserDetails = [
  body('bio').exists(),
  async function (req, res) {
    const errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() })
    }
    try{
      await db.User.update(
        {
          bio: req.body.bio
        },
        {
          where: {id: req.user.id}
        }
      )
      return res.status(200).json({success: true})
    }catch(err){
      console.log(err)
      return res.status(500).json({success: false, message: 'Error updating bio'})
    }
  }
]

exports.getMyDetails = async function (req, res) {
  try{
    var userDetails = await db.User.findOne({
      where: {id: req.user.id},
      attributes: ['email', 'handle', 'bio', 'profileImageUrl']
    })
    return res.status(200).json(userDetails)
  }catch(err) {
    console.log(err)
    return res.status(500).json({success: false, message: 'Error getting details'})
  }
}

exports.getUserDetails = async function (req, res) {
    try{
      console.log(req.params.handle)
      var userDetails = await db.User.findOne({
        where: {handle: req.params.handle},
        attributes: ['email', 'handle', 'bio', 'profileImageUrl']
      })
      return res.status(200).json(userDetails)
    }catch(err){
      console.log(err)
      return res.status(500).json({success: false, message: 'Error getting details'})
    }
  }
