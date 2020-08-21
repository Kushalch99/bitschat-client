module.exports = (sequelize, type) => {
  var Comment = sequelize.define('comment',
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
        Comment.belongsTo(models.User, { foreignKey: { allowNull: false } })
        Comment.belongsTo(models.Scream, { foreignKey: { allowNull: false } })
      }
    }
  }
  )
  return Comment
}
