const Sequelize = require('sequelize');
const database = require('../config/database.js');

const Post = database.define('post', {
    creator: {type: Sequelize.STRING},
    date: {type: Sequelize.DATE},
    text: {type: Sequelize.STRING},
    likes: {type: Sequelize.INTEGER},
    file: {type: Sequelize.STRING},
    // dates => current time
    myDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

module.exports = Post;