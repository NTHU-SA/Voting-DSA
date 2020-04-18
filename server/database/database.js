const Sequelize = require('sequelize');
const config = require('../config.js');

const sequelize = new Sequelize(
    config.dbName, config.dbUser, config.dbPassword, {
        host: config.dbHost,
        dialect: 'mariadb',
    }
);

// test the connection
sequelize.authenticate()
    .then(() => {
        console.log('database connected successfully.');
    })
    .catch((error) => {
        console.error(`database connection failed：${error}`);
    });

module.exports = sequelize;
