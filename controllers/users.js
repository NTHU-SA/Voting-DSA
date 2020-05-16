
const Mongoose = require('mongoose');
const Users = Mongoose.model('users');
const Activities = Mongoose.model('activities');

module.exports = {
    async addUser(req, res) {
        try {
            const { student_id } = req.body;
            const created_at = new Date();
            const updated_at = created_at;
            const result = await Users.create({ student_id, created_at, updated_at });
            res.json(result);
        } catch (error) {
            res.status(404).json({ error });
        }
    },

    async getUser(req, res) {
        try {
            const { _id } = req.body;
            const result = await Users.findById(_id).lean();
            res.json(result);
        } catch (error) {
            res.status(404).json({ error });
        }
    },

    async getUsers(req, res) {
        try {
            const { filter, limit, skip, sort } = req.body;
            const total = await Users.countDocuments(filter).lean();
            const data = await Users.find(filter, null, { limit, skip, sort }).lean();
            res.json({ total, data });
        } catch (error) {
            res.status(404).json({ error });
        }
    },

    async modifyUser(req, res) {
        try {
            const { _id, student_id } = req.body;
            const updated_at = new Date();
            const result = await Users.updateOne({ _id }, { student_id, updated_at }).lean();
            res.json(result.n > 0 ? { success: true } : {});
        } catch (error) {
            res.status(404).json({ error });
        }
    },

    async removeUser(req, res) {
        try {
            const { _id } = req.body;
            const user = await Users.findById(_id).lean();
            if (user) {
                await Activities.updateOne({ _id: user.activity_id }, {
                    $pull: {
                        users: _id,
                    },
                });
            }
            const result = await Users.deleteOne({ _id }).lean();
            res.json(result.n > 0 ? { success: true } : {});
        } catch (error) {
            res.status(404).json({ error });
        }
    },
};
