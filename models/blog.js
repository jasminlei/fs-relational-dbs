const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: [1991],
          msg: 'Year must be at least 1991',
        },
        max: {
          args: [new Date().getFullYear()],
          msg: `Year must not be greater than ${new Date().getFullYear()}`,
        },
      },
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' },
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'blog',
  },
)

module.exports = Blog
