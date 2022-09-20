const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { SECRET } = require('../config/environment')

const { Product, User } = require('../models')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const productFinder = async (req, res, next) => {
  found = await Product.findByPk(req.params.id)
  if (found) {
    req.product = found
    next()
  } else {
    res.status(404).end()
  }
}

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where.content = {
      [Op.substring]: req.query.search,
    }
  }

  const products = await Product.findAll({
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
  })

  res.json(products)
})

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const product = await Product.create({
      ...req.body,
      userId: user.id,
    })
    res.json(product)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', productFinder, async (req, res) => {
  if (req.product) {
    res.json(req.product)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', tokenExtractor, productFinder, async (req, res) => {
  if (req.product) {
    req.product.name = req.body.name
    await req.product.save()
    res.json(req.product)
  } else {
    res.status(404).end()
  }
})

module.exports = router
