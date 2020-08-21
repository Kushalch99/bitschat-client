module.exports = (sequelize, type) => {
  var Like = sequelize.define('like',
  {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  },
  {
    classMethods: {
      associate: function (models) {
        Like.belongsTo(models.User, { foreignKey: { allowNull: false } })
        Like.belongsTo(models.Scream, { foreignKey: { allowNull: false } })
      }
    }
  }
  )
  return Like
}
