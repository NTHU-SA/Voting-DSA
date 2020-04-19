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
    }}, {
    // timestamps: false,
    freezeTableName: true,
});

module.exports = VoteRecord;
