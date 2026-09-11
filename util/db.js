const { Sequelize } = require('sequelize')
const config = require('./config')

const databaseUrl = process.env.TESTING === 'true' ? config.TEST_DATABASE_URL : config.DATABASE_URL

const sequelize = new Sequelize(databaseUrl)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Database connected')
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exit(1)
  }
}

module.exports = {
  sequelize,
  connectToDatabase,
}
