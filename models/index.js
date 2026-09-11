const Blog = require('./blog')
const ReadingList = require('./reading_list')
const Session = require('./session')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasMany(Session)
Session.belongsTo(User)

User.belongsToMany(Blog, {
  through: ReadingList,
  foreignKey: 'user_id',
  otherKey: 'blog_id',
})
Blog.belongsToMany(User, {
  through: ReadingList,
  foreignKey: 'blog_id',
  otherKey: 'user_id',
})

module.exports = {
  Blog,
  ReadingList,
  Session,
  User,
}
