const express = require('express')
const { ValidationError } = require('sequelize')
const authorsRouter = require('./controllers/authors')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')

const app = express()

app.use(express.json())

app.use('/api/authors', authorsRouter)
app.use('/api/blogs', blogsRouter)
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
