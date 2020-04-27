/* eslint-disable new-cap */
'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Activity', {
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
                primaryKey: true,
            },
            startTime: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            endTime: {
                allowNull: false,
                type: Sequelize.DATE,
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
        return queryInterface.dropTable('Activity');
    },
};
