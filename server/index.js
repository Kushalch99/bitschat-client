require('module-alias/register')
const express = require('express')
const passport = require('passport')
const path = require('path')
var bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const { User } = require('./sequelize').db
var app = express()
app.use(bodyParser.json())
const Multer = require('multer')

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
})
app.get('/', (req, res) => {
  res.json({ message: 'server running sucessfully' })
})

const passportAuth = require('@/controller/authentication/passport_auth');
passportAuth.initPassport(app)

require('./routes/auth')(app)
require('./routes/user')(app, multer)

app.get('/api/users', (req, res) => {
  console.log('API to get users called')
  User.findAll().then((users) => res.json(users))
})

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port: ' + process.env.PORT)
})
