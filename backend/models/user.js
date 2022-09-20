const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model {
  toJSON() {
    let values = Object.assign({}, this.get())

    delete values.password
    return values
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'user',
  }
)

module.exports = User
