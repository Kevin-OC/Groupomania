const Sequelize = require('sequelize');
const database = require('../config/database.js');
const User = require('../models/User.js');

/* schéma sequelize pour post */
const Post = database.define('post', {
    text: {type: Sequelize.STRING},
    file: {type: Sequelize.STRING}
});

//Post.belongsTo(User);

module.exports = Post;