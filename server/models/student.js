/* eslint-disable new-cap */
'use strict';
module.exports = (sequelize, DataTypes) => {
    const student = sequelize.define('Student', {
        id: {
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
        },
        college: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {freezeTableName: true});
    student.associate = function(models) {
        // associations can be defined here
    };
    return student;
};
