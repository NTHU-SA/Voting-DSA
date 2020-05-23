
const Mongoose = require('mongoose');
const Activities = Mongoose.model('activities');

module.exports = {
    async addActivity(req, res) {
        try {
            const {name, type, rule} = req.body;
            // Add new activity type here
            const allowTypes = ['candidate'];
            // Add new activity rule here
            const allowRules = ['choose_one', 'choose_all'];
            if (!allowTypes.includes(type)) throw new Error(`Cannot add activity, invalid type=${type}`);
            if (!allowRules.includes(rule)) throw new Error(`Cannot add activity, invalid rule=${rule}`);
            const created_at = new Date();
            const updated_at = created_at;
            const result = await Activities.create({name, type, rule, created_at, updated_at});
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
            const availableData = await Activities.find({users: {'$nin': user_id} }, null, {limit, skip, sort}).lean();
            const unavailableData = await Activities.find({users: user_id}, null, {limit, skip, sort}).lean();
            const result = {'available': [], 'unavailable': []};
            availableData.forEach(activity => {result.available.push({_id: activity._id, name: activity.name});});
            unavailableData.forEach(activity => {result.unavailable.push({_id: activity._id, name: activity.name});});
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
