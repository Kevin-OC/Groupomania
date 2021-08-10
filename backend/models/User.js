const Sequelize = require('sequelize');
const database = require('../config/database.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');

/* schéma sequelize pour user */
const User = database.define('user', {
    email: {type: Sequelize.DataTypes.STRING}, // <- Unique = true ? package ?
    firstname: {type: Sequelize.DataTypes.STRING},
    lastname: {type: Sequelize.DataTypes.STRING},
    password: {type: Sequelize.DataTypes.STRING},
    profile: {type: Sequelize.DataTypes.STRING, defaultValue: 'defaultUserProfile.png'},
    isAdmin: {type: Sequelize.DataTypes.BOOLEAN, defaultValue: false}
});

User.hasMany(Post /*,{onDelete: 'CASCADE'}*/);
Post.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = User;