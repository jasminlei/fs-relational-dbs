const blogsRouter = require('express').Router()
const { Blog, User } = require('../models')
const { tokenExtractor } = require('../util/token')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
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

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)

    if (blog) {
      await blog.destroy()
      res.status(204).end()
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
