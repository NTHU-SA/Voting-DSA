/* eslint-disable new-cap */
'use strict';
module.exports = (sequelize, DataTypes) => {
    const isVote = sequelize.define('IsVote', {
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
            type: DataTypes.STRING(50),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'activity', // table name
                key: 'name',
            },
        },
    }, {freezeTableName: true});
    isVote.associate = function(models) {
    // associations can be defined here
    };
    return isVote;
};