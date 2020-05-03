
const Mongoose = require('mongoose');
const Votes = Mongoose.model('votes');
const Options = Mongoose.model('options');
const Activities = Mongoose.model('activities');
const Users = Mongoose.model('users');
const {v4: uuid} = require('uuid');

module.exports = {
    async addVote(req, res) {
        try {
<<<<<<< HEAD
            const studentID = req.user;
            const userID = await Users.find({'student_id': studentID}, {student_id: 0, created_at: 0, updated_at: 0, __v: 0}).lean();
            const user_id = Object.values(userID[0])[0];
            const {activity_id, rule, choose_all = null, choose_one = null} = req.body;
=======
            const {user_id, activity_id, rule, choose_all = null, choose_one = null} = req.body;
>>>>>>> 2d759fd083eceec8035e5b0401ea6986259f5f82
            const allowRules = ['choose_all', 'choose_one'];
            if (!allowRules.includes(rule)) throw new Error(`Failed to add vote, rule=${rule} is not valid`);
            if (!req.body[rule]) throw new Error(`Failed to add vote, params should carry key: ${rule}`);


            // TODO: Validate choose_all (remark)

            // Get all options
            const optionArr = [];
            switch (rule) {
            case 'choose_all':
                for (const choice of choose_all) {
                    optionArr.push(choice.option_id);
                }
                break;
            case 'choose_one':
                optionArr.push(choose_one);
                break;
            default:
                break;
            };

            const activity = await Activities.findById(activity_id).lean();
            const options = await Options.find({_id: {$in: optionArr}, activity_id}).lean();
            const user = await Users.findById(user_id).lean();
            if (!activity) throw new Error('Failed to add vote, activity_id not found');
            if (options.length !== optionArr.length) throw new Error('Failed to add vote, given options are not valid');
            if (!user) throw new Error('Failed to add vote, user_id not found');
            if (activity.users.findIndex((user) => user.toString() === user_id) !== -1) throw new Error('Failed to add vote, user already vote');
            if (activity.rule !== rule) throw new Error('Failed to add vote, rule does not match activity\'s rule');

            const created_at = new Date();
            const updated_at = created_at;
            const token = uuid();
            const params = {
                activity_id,
                rule,
                token,
                created_at,
                updated_at,
                [rule]: req.body[rule],
            };
            const result = await Votes.create(params);
            await Activities.updateOne({_id: activity_id}, {
                $addToSet: {
                    users: user_id,
                },
            }).lean();
            res.json(result);
        } catch (error) {
            res.status(404).json({error});
        }
    },

    async getVote(req, res) {
        try {
            const {_id} = req.body;
            const result = await Votes.findById(_id).lean();
            res.json(result);
        } catch (error) {
            res.status(404).json({error});
        }
    },

    async getVotes(req, res) {
        try {
            const {filter, limit, skip, sort} = req.body;
            const total = await Votes.countDocuments(filter).lean();
            const data = await Votes.find(filter, null, {limit, skip, sort}).lean();
            res.json({total, data});
        } catch (error) {
            res.status(404).json({error});
        }
    },

    async getVoteResult(req, res) {
        try {
            const {activity_id} = req.body;
            const result = await Votes.aggregate([
                {
                    $match: {
                        // eslint-disable-next-line new-cap
                        activity_id: Mongoose.Types.ObjectId(activity_id),
                    },
                },
                /*
                {
                    $group: {
                        _id: '$option_id',
                        total: {$sum: 1},
                    },
                },
                */
            ]).exec();

            // Format result
            /*
            const optionArr = [];
            for (const option of result) optionArr.push(option._id);
            const options = await Options.find({_id: {$in: optionArr}}).lean();
            const optionObj = {};
            for (const option of options) optionObj[option._id] = option;
            for (const option of result) option.option = optionObj[option._id];
            */
            res.json(result);
        } catch (error) {
            res.status(404).json({error});
        }
    },

    /* No Need
  async modifyVote(req, res) {
    try {
      const { _id, ...params } = req.body;
      const updated_at = new Date();
      const result = await Votes.updateOne({ _id }, { ...params, updated_at }).lean();
      res.json(result.n > 0 ? { success: true } : {});
    } catch (error) {
      res.status(404).json(error);
    }
  },
  */

    async removeVote(req, res) {
        try {
            const {_id} = req.body;
            const result = await Votes.deleteOne({_id}).lean();
            res.json(result.n > 0 ? {success: true} : {});
        } catch (error) {
            res.status(404).json({error});
        }
    },
};
