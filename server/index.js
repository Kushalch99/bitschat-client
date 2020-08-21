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

app.get('/', (req, res) => {
  res.json({ message: 'server running sucessfully' })
})
const passportAuth = require('@/controller/authentication/passport_auth');
passportAuth.initPassport(app);
app.get('/api/users', (req, res) => {
  console.log('API to get users called')
  User.findAll().then((users) => res.json(users))
})
console.log(process.env.PORT)
app.listen(process.env.PORT, function () {
  console.log('Example app listening on port: ' + process.env.PORT)
})
