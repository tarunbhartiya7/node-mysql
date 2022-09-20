const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Product extends Model {}

Product.init(
  {
    product_i18n_id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.BIGINT(20),
    },
    name: {
      type: DataTypes.STRING(100),
    },
    i18Name: {
      type: DataTypes.STRING(100),
    },
    modelNumber: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'product_i18n',
    freezeTableName: true,
  }
)

module.exports = Product
