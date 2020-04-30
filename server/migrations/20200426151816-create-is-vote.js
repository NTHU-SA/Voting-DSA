/* eslint-disable new-cap */
'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('IsVote', {
            studentId: {
                type: Sequelize.STRING(25),
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'Student', // table name
                    key: 'id',
                },
            },
            activityName: {
                type: Sequelize.STRING(50),
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'Activity', // table name
                    key: 'name',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('IsVote');
    },
};
