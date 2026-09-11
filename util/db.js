const { Sequelize } = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug')
const config = require('./config')

const databaseUrl =
  process.env.TESTING === 'true'
    ? config.TEST_DATABASE_URL
    : config.DATABASE_URL

const sequelize = new Sequelize(databaseUrl)

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()

  console.log('Migrations up to date', {
    files: migrations.map((migration) => migration.name),
  })
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
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
