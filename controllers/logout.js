const logoutRouter = require('express').Router()
const { Session } = require('../models')
const { authenticateSession } = require('../util/auth')

logoutRouter.delete('/', authenticateSession, async (req, res, next) => {
  try {
    await Session.destroy({
      where: {
        userId: req.user.id,
      },
    })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = logoutRouter
