const Sequelize = require('sequelize');
/* ORM sequelize ('database', 'username', 'password') pour se connecter à notre database (ici MySQL) */
module.exports = sequelize = new Sequelize('groupomania', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});