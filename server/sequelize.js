const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const ScreamModel = require('./models/scream')
const LikeModel = require('./models/like')
const CommentModel = require('./models/comment')
const NotificationModel = require('./models/notification')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: process.env.NODE_ENV === 'production' ? '' : console.log
  }
)

var db = {}
db.User = UserModel(sequelize, Sequelize)
db.Scream = ScreamModel(sequelize, Sequelize)
db.Like = LikeModel(sequelize, Sequelize)
db.Comment = CommentModel(sequelize, Sequelize)
db.Notification= NotificationModel(sequelize, Sequelize)
Object.keys(db).forEach(function (modelName) {
  if ('classMethods' in db[modelName].options) {
    if ('associate' in db[modelName].options['classMethods']) {
      db[modelName].options.classMethods.associate(db)
    }
  }
})

sequelize
  .sync({ force: false, alter: false })
  .then(() => {
    console.log('Database & tables created!')
  })
  .catch(err => console.log(err))
module.exports.db = db
module.exports.sequelize = sequelize
