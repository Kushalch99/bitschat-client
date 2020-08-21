module.exports = (sequelize, type) => {
  var Notification = sequelize.define('notification', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    read: {
      type: type.INTEGER,
      allowNull: false
    },
    type: {
      type: type.INTEGER,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function (models) {
        Notification.belongsTo(models.User, { as: 'senderUser' })
        Notification.belongsTo(models.User, { as: 'receiverUser' })
        Notification.belongsTo(models.Scream)
      }
    },
  })
  return Notification
}
