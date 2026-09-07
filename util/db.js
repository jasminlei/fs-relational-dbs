const { Sequelize } = require('sequelize')
const config = require('./config')

const sequelize = new Sequelize(config.DATABASE_URL)

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
