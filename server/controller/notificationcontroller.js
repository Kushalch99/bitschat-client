const { body,  query } = require('express-validator/check')
const db = require('@/sequelize').db
const { check, validationResult } = require('express-validator');
const notification = require('../models/notification');
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return `${msg}`;
}
