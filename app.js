const express = require('express')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const app = express()

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  res.status(400).json({
    error: error.message,
  })
}

app.use(errorHandler)

module.exports = app
