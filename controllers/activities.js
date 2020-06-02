
const Mongoose = require('mongoose');
const Activities = Mongoose.model('activities');

module.exports = {
    async addActivity(req, res) {
        try {
            const {name, type, rule, open_from, open_to} = req.body;
            // Add new activity type here
            const allowTypes = ['candidate'];
            // Add new activity rule here
            const allowRules = ['choose_one', 'choose_all'];
            if (!allowTypes.includes(type)) throw new Error(`Cannot add activity, invalid type=${type}`);
            if (!allowRules.includes(rule)) throw new Error(`Cannot add activity, invalid rule=${rule}`);
            const created_at = new Date();
            const updated_at = created_at;
            openFrom = new Date(open_from);
            openTo = new Date(open_to);
            const result = await Activities.create({name, type, rule, created_at, updated_at, 'open_from': openFrom, 'open_to': openTo});
            res.json(result);
        } catch (error) {
            res.status(404).json({error});
        }
    },

    async getActivity(req, res) {
        try {
            const {_id} = req.body;
            const result = await Activities.findById(_id).lean();
            res.json(result);
        } catch (error) {
            res.status(404).json({error});
        }
    },

    async getActivities(req, res) {
        try {
            const {filter, limit, skip, sort} = req.body;
            const total = await Activities.countDocuments(filter).lean();
            const data = await Activities.find(filter, null, {limit, skip, sort}).lean();
            res.json({total, data});
        } catch (error) {
            res.status(404).json({error});
        }
    },

    async getAvailableActivities(req, res) {
        try {
            const {filter, limit, skip, sort} = req.body;
            const { _id: user_id, student_id } = req.user;
            const now = new Date();
            const availableData = await Activities.find({users: {'$nin': user_id}, open_from: {'$lt': now}, open_to: {'$gte': now}}, null, {limit, skip, sort}).lean();
            // 已投過票
            const votedData = await Activities.find({users: user_id}, null, {limit, skip, sort}).lean();
            // 時間已過
            const expiredData = await Activities.find({open_to: {'$lt': now}}, null, {limit, skip, sort}).lean();
            // 時候未到
            const notStartedData = await Activities.find({open_from: {'$gte': now}}, null, {limit, skip, sort}).lean();
            const result = {'available': [], 'unavailable': new Set()};
            availableData.forEach((activity) => {
                result.available.push({_id: activity._id, name: activity.name});
            });
            votedData.forEach((activity) => {
                result.unavailable.add({_id: activity._id, name: activity.name});
            });
            expiredData.forEach((activity) => {
                result.unavailable.add({_id: activity._id, name: activity.name});
            });
            notStartedData.forEach((activity) => {
                result.unavailable.add({_id: activity._id, name: activity.name});
            });
            result.unavailable = Array.from(result.unavailable);
            res.json(result);
        } catch (error) {
            res.status(404).json({error});
        }
    },

    async modifyActivity(req, res) {
        try {
            const {_id, ...params} = req.body;
            // TODO: Validate params here
            const updated_at = new Date();
            const result = await Activities.updateOne({_id}, {...params, updated_at}).lean();
            res.json(result.n > 0 ? {success: true} : {});
        } catch (error) {
            res.status(404).json({error});
        }
    },

    async removeActivity(req, res) {
        try {
            const {_id} = req.body;
            const result = await Activities.deleteOne({_id}).lean();
            res.json(result.n > 0 ? {success: true} : {});
        } catch (error) {
            res.status(404).json({error});
        }
    },
};
