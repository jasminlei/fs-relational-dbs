const blogsRouter = require('express').Router()
const { Blog } = require('../models')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body)
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

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  res.status(400).json({
    error: error.message,
  })
}

app.use(errorHandler)

module.exports = blogsRouter
