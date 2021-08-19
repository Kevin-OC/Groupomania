'use strict';
const {	Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Like extends Model {
		static associate(models) {
			/* nos associations pour le model Like */
			Like.belongsTo(models.User, {
				onDelete: 'cascade',
				foreignKey: { name: 'userId', allowNull: false },
				hooks: true });
			Like.belongsTo(models.Post, {
				onDelete: 'cascade',
				foreignKey: { name: 'postId', allowNull: false },
				hooks: true });
		}
	};
	Like.init({
		/* Like est un booléan */
		like: DataTypes.BOOLEAN
	}, {
		sequelize,
		modelName: 'Like',
	});
	return Like;
};