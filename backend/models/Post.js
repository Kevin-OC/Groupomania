const Sequelize = require('sequelize');
const database = require('../config/database.js');
const User = require('../models/User.js');
const Comment = require('../models/Comment.js');

/* schéma sequelize pour post */
const Post = database.define('post', {
    text: {type: Sequelize.STRING},
    file: {type: Sequelize.STRING}
});

/* associations */
Post.hasMany(Comment);
Comment.belongsTo(Post);

/*
//Post.belongsTo(User);
Post.associate = (models) => {
    Post.hasMany(models.Comment, {
        onDelete: "cascade",
        foreignKey: 'postId',
        as: 'postId'
    });
};
*/
module.exports = Post;

