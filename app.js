const express = require('express')
const { ValidationError } = require('sequelize')
const authorsRouter = require('./controllers/authors')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const readingListsRouter = require('./controllers/readinglists')
const usersRouter = require('./controllers/users')
const { Blog, ReadingList, Session, User } = require('./models')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.post('/api/reset', async (req, res, next) => {
  try {
    await Session.destroy({ where: {} })
    await ReadingList.destroy({ where: {} })
    await Blog.destroy({ where: {} })
    await User.destroy({ where: {} })

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

app.use('/api/authors', authorsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/readinglists', readingListsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error instanceof ValidationError) {
    const errors = error.errors.map((err) => err.message)
    return res.status(400).json({
      error: errors,
    })
  }

  res.status(400).json({
    error: error.message,
  })
}

app.use(errorHandler)

module.exports = app
