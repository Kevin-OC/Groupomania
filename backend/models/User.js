const Sequelize = require('sequelize');
const database = require('../config/database.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');

/* schéma sequelize pour user */
const User = database.define('user', {
    email: {type: Sequelize.DataTypes.STRING},
    firstname: {type: Sequelize.DataTypes.STRING},
    lastname: {type: Sequelize.DataTypes.STRING},
    password: {type: Sequelize.DataTypes.STRING},
    profile: {type: Sequelize.DataTypes.STRING, defaultValue: 'defaultUserProfile.png'},
    isAdmin: {type: Sequelize.DataTypes.BOOLEAN, defaultValue: false}
});

/* associations */
User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);

/*
User.hasMany(Post, {
    onDelete: 'cascade',
    foreignKey: { allowNull: false },
    hooks: true
});
*/

module.exports = User;