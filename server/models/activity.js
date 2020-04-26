/* eslint-disable new-cap */
const {DataTypes} = require('sequelize');
const database = require('../database/database.js');

const Activity = database.define('activity', {
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        primaryKey: true,
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
    }}, {
    freezeTableName: true,
});


module.exports = Activity;
