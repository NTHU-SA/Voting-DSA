
const Mongoose = require('mongoose');
const Activities = Mongoose.model('activities');

module.exports = {
  async addActivity(req, res) {
    try {
      const { name } = req.body;
      const created_at = new Date();
      const updated_at = created_at;
      const result = await Activities.create({ name, created_at, updated_at });
      res.json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  },

  async getActivity(req, res) {
    try {
      const { _id } = req.body;
      const result = await Activities.findById(_id).lean();
      res.json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  },

  async getActivities(req, res) {
    try {
      const { filter, limit, skip, sort } = req.body;
      const total = await Activities.countDocuments(filter).lean();
      const data = await Activities.find(filter, null, { limit, skip, sort }).lean();
      res.json({ total, data });
    } catch (error) {
      res.status(404).json(error);
    }
  },

  async modifyActivity(req, res) {
    try {
      const { _id, name } = req.body;
      const updated_at = new Date();
      const result = await Activities.updateOne({ _id }, { name, updated_at }).lean();
      res.json(result.n > 0 ? { success: true } : {});
    } catch (error) {
      res.status(404).json(error);
    }
  },

  async removeActivity(req, res) {
    try {
      const { _id } = req.body;
      const result = await Activities.deleteOne({ _id }).lean();
      res.json(result.n > 0 ? { success: true } : {});
    } catch (error) {
      res.status(404).json(error);
    }
  }
};
