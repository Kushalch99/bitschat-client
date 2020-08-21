module.exports = (sequelize, type) => {
  var Scream = sequelize.define('scream',
  {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    body: {
      type: type.TEXT,
      allowNull: false
    }
  },
  {
    classMethods: {
      associate: function (models) {
        Scream.belongsTo(models.User, { foreignKey: { allowNull: false } })
        Scream.hasMany(models.Like)
        Scream.hasMany(models.Comment)
        Scream.hasMany(models.Notification)
      }
    }
  }
  )
  return Scream
}
