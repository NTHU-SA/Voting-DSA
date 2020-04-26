/* eslint-disable new-cap */
const {DataTypes} = require('sequelize');
const database = require('../database/database.js');

const IsVote = database.define('isVote', {
    studentId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'student', // table name
            key: 'id',
        },
    },
    activityName: {
        type: DataTypes.STRING(60),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'activity', // table name
            key: 'name',
        },
    }}, {
    freezeTableName: true,
});

module.exports = IsVote;
