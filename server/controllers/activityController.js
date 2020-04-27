const {sequelize} = require('../models');
const {DataTypes} = require('sequelize');
const Activity = require('../models/activity.js')(sequelize, DataTypes);

module.exports = {

    async createActivity(req, res) {
        const activityName = req.body.activity_name;
        const startTimestamp = req.body.start_timestamp;
        const endTimestamp = req.body.end_timestamp;

        await Activity.create({
            name: activityName,
            startTime: new Date(parseInt(startTimestamp)),
            endTime: new Date(parseInt(endTimestamp)),
        });

        res.send({status: true});
    },
};
