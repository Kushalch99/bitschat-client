const bcrypt = require('bcrypt')
const cryptoRandomString = require('crypto-random-string')

module.exports = (sequelize, type) => {
  var User = sequelize.define(
    'user',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: type.STRING,
        allowNull: false,
        unique: true
      },
      handle: {
        type: type.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: type.STRING,
        allowNull: false
      },
      profileImageUrl: {
        type: type.STRING,
        allowNull: true
      },
      isVerified: {
        type: type.BOOLEAN,
        defaultValue: false
      },
      bio: {
        type: type.TEXT,
        allowNull: true,
        defaultValue: 'Let me scream!'
      }
    },
    {
      classMethods: {
        associate: function (models) {
          User.hasMany(models.Scream)
        }
      }
    }
  )

  User.generatePassword = function () {
    return cryptoRandomString({ length: 12, type: 'url-safe' })
  }

  User.generateHash = function (password) {
    return bcrypt.hashSync(password, 10)
  }

  User.generateVerificationToken = function () {
    return cryptoRandomString({ length: 16, type: 'url-safe' })
  }

  User.generatePasswordResetToken = function () {
    return cryptoRandomString({ length: 20, type: 'url-safe' })
  }

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }
  return User
}
