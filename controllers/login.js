const crypto = require('crypto')
const loginRouter = require('express').Router()
const { User } = require('../models')

loginRouter.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({
      where: {
        username,
        password,
      },
    })

    if (!user) {
      return res.status(401).json({ error: 'invalid username or password' })
    }

    const token = crypto.randomBytes(32).toString('hex')
    user.token = token
    await user.save()

    res.status(200).json({
      token,
      username: user.username,
      name: user.name,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter
