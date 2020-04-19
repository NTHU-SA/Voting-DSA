/* eslint-disable new-cap */
const {DataTypes} = require('sequelize');
const database = require('../database/database.js');

const Student = database.define('student', {
    id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
    },
    isVote: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }}, {
    freezeTableName: true,
});

module.exports = Student;
