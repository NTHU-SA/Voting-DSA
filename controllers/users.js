
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
            const {student_id} = req.user;
            const result = await Users.findOne({student_id}).lean();
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
            const { _id, student_id, remark, byStuId } = req.body;
            
            const key = byStuId ? {"student_id": student_id}:{"_id": _id};
            
            const updated_at = new Date();
            var result = "";
            //如果沒有傳入 remark 那就不更新 remark，維持原狀
            if(remark == null){
                result = await Users.updateOne(key, { student_id, updated_at }).lean();
            }else{
                //如果有傳入{remark:"admin"}就指定為管理員，{remark:""} 就移除管理員
                result = await Users.updateOne(key, { student_id, remark, updated_at }).lean();
            }         

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
