'use strict';
module.exports = (sequelize, DataTypes) => {
    const voteRecord = sequelize.define('VoteRecord', {
        activityName: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'activity', // table name
                key: 'name',
            },
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {freezeTableName: true});
    voteRecord.associate = function(models) {
        // associations can be defined here
    };
    return voteRecord;
};
