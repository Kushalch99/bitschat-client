require('module-alias/register')
const express = require('express');
const passport = require('passport');
const path = require('path');
const history = require('connect-history-api-fallback');
var bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
var app = express();
app.use(history({}));
app.use(bodyParser.json())


// const passportAuth = require('@/controller/authentication/passport_auth');
// passportAuth.initPassport(app);

console.log(process.env.PORT)
app.listen(process.env.PORT, function () {
  console.log('Example app listening on port: ' + process.env.PORT);
});

