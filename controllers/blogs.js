const blogsRouter = require('express').Router()
const { Op } = require('sequelize')
const { Blog, User } = require('../models')
const { tokenExtractor } = require('../util/token')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const where = {}

    if (req.query.search) {
      where.title = {
        [Op.substring]: req.query.search,
      }
    }

    const blogs = await Blog.findAll({
      ...(Object.keys(where).length ? { where } : {}),
      include: {
        model: User,
        attributes: ['id', 'name', 'username'],
      },
    })
    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', tokenExtractor, async (req, res, next) => {
  try {
    if (!req.token) {
      return res.status(401).json({ error: 'token missing' })
    }

    const user = await User.findOne({
      where: { token: req.token },
    })

    if (!user) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
    })
    res.json(blog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)

    if (!req.token) {
      return res.status(401).json({ error: 'token missing' })
    }

    const user = await User.findOne({
      where: { token: req.token },
    })

    if (!user) {
      return res.status(401).json({ error: 'token invalid' })
    }

    if (blog && blog.userId === user.id) {
      await blog.destroy()
      res.status(204).end()
    } else if (blog) {
      res.status(403).json({ error: 'not allowed to delete this blog' })
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)

    if (blog) {
      blog.likes = req.body.likes

      await blog.save()
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
