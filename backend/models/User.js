'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			/* toutes nos associations avec onDelete: 'cascade' + la foreignKey */
			User.hasMany(models.Post, {
				onDelete: 'cascade',
				foreignKey: { name: 'userId', allowNull: false },
				hooks: true });
			User.hasMany(models.Comment, {
				onDelete: 'cascade',
				foreignKey: { name: 'userId', allowNull: false },
				hooks: true });
			User.hasMany(models.Like, {
				onDelete: 'cascade',
				foreignKey: { name: 'userId', allowNull: false },
				hooks: true });
		}
	};
	User.init({
		/* User a un email, prénom, nom, password, photo de profile et un statut admin ou pas */
		email: DataTypes.STRING,
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		password: DataTypes.STRING,
		profile: { type: DataTypes.STRING, defaultValue: 'defaultUserProfile.png' },
		isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
	}, {
		sequelize,
		modelName: 'User',
	});
	return User;
};