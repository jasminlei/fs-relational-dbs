const readingListsRouter = require('express').Router()
const { Blog, ReadingList, User } = require('../models')

readingListsRouter.post('/', async (req, res, next) => {
  try {
    const { blogId, userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' })
    }

    if (!blogId) {
      return res.status(400).json({ error: 'blogId is required' })
    }

    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(400).json({ error: 'Invalid userId' })
    }

    const blog = await Blog.findByPk(blogId)
    if (!blog) {
      return res.status(400).json({ error: 'Invalid blogId' })
    }

    const existingEntry = await ReadingList.findOne({
      where: {
        userId,
        blogId,
      },
    })

    if (existingEntry) {
      return res.status(400).json({ error: 'Blog already in reading list' })
    }

    const reading = await ReadingList.create({
      userId,
      blogId,
      read: false,
    })

    res.status(201).json(reading)
  } catch (error) {
    next(error)
  }
})

module.exports = readingListsRouter
