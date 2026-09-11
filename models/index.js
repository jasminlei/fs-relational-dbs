const Blog = require('./blog')
const ReadingList = require('./reading_list')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, foreignKey: 'user_id' })
Blog.belongsToMany(User, { through: ReadingList, foreignKey: 'blog_id' })

module.exports = {
  Blog,
  ReadingList,
  User,
}
