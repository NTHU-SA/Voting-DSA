
const Mongoose = require('mongoose');
const Votes = Mongoose.model('votes');
const Options = Mongoose.model('options');
const Activities = Mongoose.model('activities');
const Users = Mongoose.model('users');
const { v4: uuid } = require('uuid');
const fsPromise = require('fs').promises;

module.exports = {
    async addVote(req, res) {
        try {
            const { _id: user_id, student_id } = req.user;
            const { activity_id, rule, choose_all = null, choose_one = null } = req.body;
            const allowRules = ['choose_all', 'choose_one'];
            if (!allowRules.includes(rule)) throw new Error(`Failed to add vote, rule=${rule} is not valid`);
            if (!req.body[rule]) throw new Error(`Failed to add vote, params should carry key: ${rule}`);

            // Validate choose_all remark
            if (rule === 'choose_all') {
                const valid = choose_all.every((choice) => ['我要投給他', '我不投給他', '我沒有意見'].includes(choice.remark));
                if (!valid) throw new Error('Failed to add vote, choose_all remark is not valid');
            }

            // Validate student_id
            const csvData = await fsPromise.readFile('/libs/全校在學學生資料.csv', 'utf8');
            const availableStudentList = csvData.split(/\r?\n/).slice(1);
            const availableStudentIds = availableStudentList.map((student) => student.split(',')[1]);
            if (!availableStudentIds.includes(student_id)) throw new Error('Failed to add vote, student_id is not available');

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
            const options = await Options.find({ _id: { $in: optionArr }, activity_id }).lean();
            const user = await Users.findById(user_id).lean();
            const hasVote = await Activities.exists({ _id: activity_id, users: user_id });
            const now = new Date();
            const isExpired = await Activities.exists({ _id: activity_id, open_to: {'$lt': now}});
            const isNotStarted = await Activities.exists({ _id: activity_id, open_from: {'$gte': now}});
            if (!activity) throw new Error('Failed to add vote, activity_id not found');
            if (options.length !== optionArr.length) throw new Error('Failed to add vote, given options are not valid');
            if (!user) throw new Error('Failed to add vote, user_id not found');
            if (hasVote) throw new Error('Failed to add vote, user already vote');
            if (isExpired) throw new Error('This activity has been exipred');
            if (isNotStarted) throw new Error('This activity has not started');
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
            await Activities.updateOne({ _id: activity_id }, {
                $addToSet: {
                    users: user_id,
                },
            }).lean();
            res.json(result);
        } catch (error) {
            res.status(404).send(error.message || error);
        }
    },

    async getVote(req, res) {
        try {
            const { _id } = req.body;
            const result = await Votes.findById(_id).lean();
            res.json(result);
        } catch (error) {
            res.status(404).send(error.message || error);
        }
    },

    async getVotes(req, res) {
        try {
            const { filter, limit, skip, sort } = req.body;
            const { _id: user_id, student_id } = req.user;
            const total = await Votes.countDocuments(filter).lean();
            const data = await Votes.find(filter, null, { limit, skip, sort }).lean();
            res.json({ total, data });
        } catch (error) {
            res.status(404).send(error.message || error);
        }
    },

    async getVoteResult(req, res) {
        try {
            const { activity_id } = req.body;
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
            res.status(404).send(error.message || error);
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
            const { _id } = req.body;
            const result = await Votes.deleteOne({ _id }).lean();
            res.json(result.n > 0 ? { success: true } : {});
        } catch (error) {
            res.status(404).send(error.message || error);
        }
    },
};
