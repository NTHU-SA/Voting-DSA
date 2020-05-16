
const Mongoose = require('mongoose');
const Options = Mongoose.model('options');
const Activities = Mongoose.model('activities');
const Votes = Mongoose.model('votes');

module.exports = {
    async addOption(req, res) {
        try {
            const {activity_id, type} = req.body;
            const allowTypes = ['candidate'];
            if (!allowTypes.includes(type)) throw new Error(`Failed to add option, type=${type} is not allowed`);
            const params = {activity_id, type, [type]: req.body[type]};
            const created_at = new Date();
            const updated_at = created_at;

            const activity = await Activities.findById(activity_id).lean();
            if (!activity) throw new Error('Failed to add option, activity_id not found');
            if (activity.type !== type) throw new Error('Failed to add option, type does not match activity\'s type');

            const result = await Options.create({...params, created_at, updated_at});
            await Activities.updateOne({_id: activity_id}, {
                $addToSet: {
                    options: result._id,
                },
            });

            res.json(result);
        } catch (error) {
            console.log(error);
            res.status(404).json({error});
        }
    },

    async getOption(req, res) {
        try {
            const {_id} = req.body;
            const result = await Options.findById(_id).lean();
            res.json(result);
        } catch (error) {
            res.status(404).json({error});
        }
    },

    async getOptions(req, res) {
        try {
            const {filter, limit, skip, sort} = req.body;
            const total = await Options.countDocuments(filter).lean();
            const data = await Options.find(filter, null, {limit, skip, sort}).lean();
            res.json({total, data});
        } catch (error) {
            res.status(404).json({error});
        }
    },

    async modifyOption(req, res) {
        try {
            const {_id, ...params} = req.body;
            if (params.activity_id !== undefined) throw new Error('Cannot modify option.activity_id');
            if (params.type !== undefined) throw new Error('Cannot modify option.type');

            const updated_at = new Date();
            const result = await Options.updateOne({_id}, {...params, updated_at}).lean();
            res.json(result.n > 0 ? {success: true} : {});
        } catch (error) {
            res.status(404).json({error});
        }
    },

    async removeOption(req, res) {
        try {
            const {_id} = req.body;
            const option = await Options.findById(_id).lean();
            if (option) {
                await Activities.updateOne({_id: option.activity_id}, {
                    $pull: {
                        options: _id,
                    },
                });
            }
            await Votes.deleteMany({option_id: _id}).lean();
            const result = await Options.deleteOne({_id}).lean();
            res.json(result.n > 0 ? {success: true} : {});
        } catch (error) {
            res.status(404).json({error});
        }
    },
};
