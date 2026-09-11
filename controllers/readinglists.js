const readingListsRouter = require('express').Router()
const { Blog, ReadingList, User } = require('../models')
const { authenticateSession } = require('../util/auth')

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
      return res.status(404).json({ error: 'Invalid userId' })
    }

    const blog = await Blog.findByPk(blogId)
    if (!blog) {
      return res.status(404).json({ error: 'Invalid blogId' })
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

    const readingData = reading.toJSON()

    res.status(201).json({
      id: readingData.id,
      user_id: readingData.userId,
      blog_id: readingData.blogId,
      read: readingData.read,
      createdAt: readingData.createdAt,
      updatedAt: readingData.updatedAt,
    })
  } catch (error) {
    next(error)
  }
})

readingListsRouter.put('/:id', authenticateSession, async (req, res, next) => {
  try {
    const readingList = await ReadingList.findByPk(req.params.id)

    if (!readingList) {
      return res.status(404).end()
    }

    if (readingList.userId !== req.user.id) {
      return res
        .status(401)
        .json({ error: 'not allowed to modify this reading list' })
    }

    readingList.read = req.body.read
    await readingList.save()

    res.json(readingList)
  } catch (error) {
    next(error)
  }
})

module.exports = readingListsRouter
