'use strict';
const {	Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {
			/* nos associations pour le model Comment */
			Comment.belongsTo(models.User, {
				onDelete: 'cascade',
				foreignKey: { name: 'userId', allowNull: false },
				hooks: true });
			Comment.belongsTo(models.Post, {
				onDelete: 'cascade',
				foreignKey: { name: 'postId', allowNull: false },
				hooks: true });
		}
	};
	Comment.init({
		/* Comment est un texte */
		text: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Comment',
	});
	return Comment;
};