const authorsRouter = require('express').Router()
const { fn, col } = require('sequelize')
const { Blog } = require('../models')

authorsRouter.get('/', async (req, res, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        'author',
        [fn('COUNT', col('id')), 'blogs'],
        [fn('SUM', col('likes')), 'likes'],
      ],
      group: ['author'],
      order: [[fn('SUM', col('likes')), 'DESC']],
      raw: true,
    })

    res.json(authors)
  } catch (error) {
    next(error)
  }
})

module.exports = authorsRouter