const { body,  query } = require('express-validator/check')
const db = require('@/sequelize').db
const { check, validationResult } = require('express-validator')
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return `${msg}`;
};

exports.getAllScreams = async function (req,res) {
  try{
    var screams = await db.Scream.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.User,
          attributes: ['email', 'handle', 'profileImageUrl']
        },
        {
          model: db.Like,
          attributes: ['id'],
          include: [
            {
              model: db.User,
              attributes: ['email', 'handle']
            }
          ]
        },
        {
          model: db.Comment,
          attributes: ['id', 'body', 'userId'],
          include: [
            {
              model: db.User,
              attributes: ['email', 'handle']
            }
          ]
        }
      ]
    })
    return res.status(200).json(screams)
  }catch (err){
    console.log(err)
    return res.status(500).json({ success: false, message: "Error getting screams"})
  }
}
exports.getMyScreams = async function (req, res) {
  try{
    var screams = await db.Scream.findAll({
      order: [['createdAt', 'DESC']],
      where: {userId: req.user.id},
      include: [
        {
          model: db.Like,
          attributes: ['id'],
          include: [
            {
              model: db.User,
              attributes: ['email', 'handle']
            }
          ]
        },
        {
          model: db.Comment,
          attributes: ['id', 'body', 'userId'],
          include: [
            {
              model: db.User,
              attributes: ['email', 'handle']
            }
          ]
        }
      ]
    })
    return res.status(200).json(screams)
  }catch(err){
    console.log(err)
    return res.status(500).json({success: false,message: 'Error getting scream'})
  }
}

exports.getUserScreams = async function (req, res) {
  try{
    var screams = await db.Scream.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.User,
          where: { handle: req.params.handle },
          attributes: [],
          reqiured: true
        },
        {
          model: db.Like,
          attributes: ['id'],
          include: [
            {
              model: db.User,
              attributes: ['email', 'handle']
            }
          ]
        },
        {
          model: db.Comment,
          attributes: ['id', 'body', 'userId'],
          include: [
            {
              model: db.User,
              attributes: ['email', 'handle']
            }
          ]
        }
      ]
    })
    return res.status(200).json(screams)
  }catch(err){
    console.log(err)
    return res.status(500).json({success: false,message: 'Error getting scream'})
  }
}

exports.postScream = [
  body('body').exists(),
  async function (req, res) {
    try{
      await db.Scream.create({
        body: req.body.body,
        userId: req.user.id  
      })
      return res.status(200).json({success: true, message: 'Scream posted successfully'})
    }catch (err) {
      console.log(err)
      return res.status(500).json({success: false, message: 'Error posting scream'})
    }
  }
]

exports.likeScream = async function (req, res) {
  try{
    await db.Like.create({
      screamId: req.params.screamId,
      userId: req.user.id
    })
    return res.status(200).json({success: true, message: 'Scream liked successfully'})
  }catch (err) {
    console.log(err)
    return res.status(500).json({success: false, message: 'Error liking scream'})
  }
}

exports.unlikeScream = async function (req, res) {
  try{
    await db.Like.destroy({
      where: {
        screamId: req.params.screamId,
        userId: req.user.id
      }
    })
    return res.status(200).json({success: true, message: 'Scream unliked successfully'})
  }catch (err) {
    console.log(err)
    return res.status(500).json({success: false, message: 'Error unliking scream'})
  }
}

exports.postComment = async function (req, res) {
  try{
    await db.Comment.create({
      body: req.body.body,
      screamId: req.params.screamId,
      userId: req.user.id
    })
    return res.status(200).json({success: true, message: 'Comment posted successfully'})
  }catch (err) {
    console.log(err)
    return res.status(500).json({success: false, message: 'Error commenting on scream'})
  }
}
