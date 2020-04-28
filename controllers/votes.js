
const Mongoose = require('mongoose');
const Votes = Mongoose.model('votes');
const { v4: uuid } = require('uuid');

module.exports = {
  async addVote(req, res) {
    try {
      const { activity_id, option_id } = req.body;
      const created_at = new Date();
      const updated_at = created_at;
      const token = uuid();
      const result = await Votes.create({ activity_id, option_id, token, created_at, updated_at });
      res.json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  },

  async getVote(req, res) {
    try {
      const { _id } = req.body;
      const result = await Votes.findById(_id).lean();
      res.json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  },

  async getVotes(req, res) {
    try {
      const { filter, limit, skip, sort } = req.body;
      const total = await Votes.countDocuments(filter).lean();
      const data = await Votes.find(filter, null, { limit, skip, sort }).lean();
      res.json({ total, data });
    } catch (error) {
      res.status(404).json(error);
    }
  },

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

  async removeVote(req, res) {
    try {
      const { _id } = req.body;
      const result = await Votes.deleteOne({ _id }).lean();
      res.json(result.n > 0 ? { success: true } : {});
    } catch (error) {
      res.status(404).json(error);
    }
  }
};
