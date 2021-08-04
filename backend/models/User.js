const Sequelize = require('sequelize');
const database = require('../config/database.js');
const Post = require('../models/Post.js');

/* schéma sequelize pour user */
const User = database.define('user', {
    email: {type: Sequelize.DataTypes.STRING}, // <- Unique = true ? package ?
    firstname: {type: Sequelize.DataTypes.STRING},
    lastname: {type: Sequelize.DataTypes.STRING},
    password: {type: Sequelize.DataTypes.STRING},
    profile: {type: Sequelize.DataTypes.STRING, defaultValue: 'defaultUserProfile.png'},
    isAdmin: {type: Sequelize.DataTypes.BOOLEAN, defaultValue: false}
});

User.hasMany(Post);
Post.belongsTo(User);

/*
Ci-dessous une méthode alternative à hasMany/belongsTo: associate(models)
Users.associate = (models) => {
    Users.hasMany(models.Post, {
        foreignKey: 'user_id',
        as: 'creator'
    });
};
*/

module.exports = User;