const { body,  query } = require('express-validator/check')
const db = require('@/sequelize').db
const { check, validationResult } = require('express-validator')
const { bucket } = require('@/config/firebase_storage.js')
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

exports.uploadProfileImage = async function (req, res) {
    let file  = req.file
    if(!file)
      return res.status(500).json({success: false,message: 'No file present'})
    let newFileName = `${file.originalname}_${Date.now()}`;
    let fileUpload = bucket.file(newFileName);
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    })

    blobStream.on('error', (error) => {
      return res.status(500).json({success:false,message:'Something is wrong! Unable to upload at the moment.'});
    })

    blobStream.on('finish', async () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = `https://firebasestorage.googleapis.com/v0/b/bitschat-29b15.appspot.com/o/${newFileName}?alt=media`
      console.log(url)
      try{
        await db.User.update( { profileImageUrl: url}, { where: { id: req.user.id } } ) 
        return res.status(200).json({success: true, message: 'Image uploaded successfully'})
      }catch (err) {
        console.log(err)
        return res.status(500).json({success:false,message:'Something is wrong! Unable to upload at the moment.'});
      }
    })

    blobStream.end(file.buffer)
}
