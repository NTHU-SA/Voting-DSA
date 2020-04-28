
const Mongoose = require('mongoose');
const Votes = Mongoose.model('votes');
const Options = Mongoose.model('options');
const Activities = Mongoose.model('activities');
const Users = Mongoose.model('users');
const { v4: uuid } = require('uuid');

module.exports = {
  async addVote(req, res) {
    try {
      const { user_id, activity_id, option_id } = req.body;

      const activity = Activities.findById(activity_id).lean();
      const option = Options.findById(option_id).lean();
      const user = Users.findById(user_id).lean();
      if (!activity) throw new Error('Failed to add vote, activity_id not found');
      if (!option) throw new Error('Failed to add option, option_id not found');
      if (!user) throw new Error('Failed to add vote, user_id not found');
      if (activity.users.includes(user._id)) throw new Error('Failed to add vote, user already vote');

      const created_at = new Date();
      const updated_at = created_at;
      const token = uuid();
      const result = await Votes.create({ activity_id, option_id, token, created_at, updated_at });
      await Activities.updateOne({ _id: activity_id }, {
        $addToSet: {
          users: user_id
        }
      });
      res.json(result);
    } catch (error) {
      res.status(404).json({ error });
    }
  },

  async getVote(req, res) {
    try {
      const { _id } = req.body;
      const result = await Votes.findById(_id).lean();
      res.json(result);
    } catch (error) {
      res.status(404).json({ error });
    }
  },

  async getVotes(req, res) {
    try {
      const { filter, limit, skip, sort } = req.body;
      const total = await Votes.countDocuments(filter).lean();
      const data = await Votes.find(filter, null, { limit, skip, sort }).lean();
      res.json({ total, data });
    } catch (error) {
      res.status(404).json({ error });
    }
  },

  async getVoteResult(req, res) {
    try {
      const { activity_id } = req.body;
      const result = Votes.aggregate([
        {
          $match: {
            activity_id: Mongoose.Types.ObjectId(activity_id)
          },
          $group: {
            _id: '$option_id',
            count: { $sum: 1 }
          }
        }
      ]).lean();
      res.json(result);
    } catch (error) {
      res.status(404).json({ error });
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
      res.status(404).json({ error });
    }
  }
};
