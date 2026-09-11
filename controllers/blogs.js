const blogsRouter = require('express').Router()
const { Blog } = require('../models')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.json(blog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)

  if (blog) {
    await blog.destroy()
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)

  if (blog) {
    blog.likes = req.body.likes

    await blog.save()
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

module.exports = blogsRouter
