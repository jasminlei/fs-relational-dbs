const app = require('./app')
const config = require('./util/config')
const { connectToDatabase } = require('./util/db')

const start = async () => {
  await connectToDatabase()

  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
  })
}

start()
