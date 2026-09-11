const usersRouter = require('express').Router()
const { User } = require('../models')

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      username: req.body.username,
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

usersRouter.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    })

    if (user) {
      user.name = req.body.name
      await user.save()
      res.json(user)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
