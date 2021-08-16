const Sequelize = require('sequelize');
const database = require('../config/database.js');
const Post = require('../models/Post.js');
const User = require('../models/User.js');

/* schéma sequelize pour comment */
const Comment = database.define('comment', {
    text: {type: Sequelize.STRING}
});

module.exports = Comment;

//User.hasMany(Comment);
//Comment.belongsTo(User);
//Comment.belongsTo(Post);
