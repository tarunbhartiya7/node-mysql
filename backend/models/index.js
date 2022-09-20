const Product = require('./product')
const User = require('./user')

User.hasMany(Product)
Product.belongsTo(User)
;(async () => {
  if (process.env.NODE_ENV !== 'test') {
    await User.sync()
    await Product.sync()
  }
})()

module.exports = {
  Product,
  User,
}
