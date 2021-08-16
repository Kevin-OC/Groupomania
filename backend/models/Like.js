const Sequelize = require('sequelize');
const database = require('../config/database.js');
const Post = require('./Post.js');
const User = require('./User.js');

/* schéma sequelize pour likes */
const Like = database.define('like', {
    like: {type: Sequelize.DataTypes.BOOLEAN}
});

module.exports = Like;

User.hasMany(Like);
Like.belongsTo(User);
Post.hasMany(Like);
Like.belongsTo(Post);