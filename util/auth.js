const { Session, User } = require('../models')

const authenticateSession = async (req, res, next) => {
  try {
    const authorization = req.get('authorization')

    if (authorization && authorization.startsWith('Bearer ')) {
      req.token = authorization.replace('Bearer ', '')
    }

    if (!req.token) {
      return res.status(401).json({ error: 'token missing' })
    }

    const session = await Session.findOne({
      where: { token: req.token },
      include: {
        model: User,
      },
    })

    if (!session || !session.user || session.user.disabled) {
      return res.status(401).json({ error: 'token invalid' })
    }

    req.session = session
    req.user = session.user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  authenticateSession,
}
