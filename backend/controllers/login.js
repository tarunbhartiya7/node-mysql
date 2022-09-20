const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/environment')
const router = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

router.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({
    where: {
      username: username,
    },
  })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET, { expiresIn: 6000 }) // 60 secs

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
