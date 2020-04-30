/* eslint-disable new-cap */
module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define('Activity', {
        name: {
            type: DataTypes.STRING(50),
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
    }, {});
    Activity.associate = function(models) {
        // associations can be defined here
    };
    return Activity;
};
