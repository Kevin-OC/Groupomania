const Sequelize = require('sequelize');
const database = require('../config/database.js');

/* schéma sequelize pour user */
const User = database.define('user', {
    email: {type: Sequelize.STRING}, // <- Unique = true ? package ?
    firstname: {type: Sequelize.STRING},
    lastname: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING},
    // dates => current time
    myDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

module.exports = User;