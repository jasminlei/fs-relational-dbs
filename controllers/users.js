const usersRouter = require('express').Router()
const { Blog, User } = require('../models')

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password', 'token'],
      },
      include: {
        model: Blog,
      },
    })
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
      password: req.body.password,
    })

    res.status(201).json({
      id: user.id,
      name: user.name,
      username: user.username,
    })
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
      res.json({
        id: user.id,
        name: user.name,
        username: user.username,
      })
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
