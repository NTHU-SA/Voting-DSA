/* eslint-disable new-cap */
const {DataTypes} = require('sequelize');
const database = require('../database/database.js');

const VoteRecord = database.define('voteRecord', {
    candidateNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    activityName: {
        type: DataTypes.STRING(60),
        allowNull: false,
        references: {
            model: 'activity', // table name
            key: 'name',
        },
    }}, {
    freezeTableName: true,
});

module.exports = VoteRecord;
