const Mongoose = require('../libs/database');
const { Schema } = Mongoose;

const activitiesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  users: {
    type: [Mongoose.Types.ObjectId]
  },
  options: {
    type: [Mongoose.Types.ObjectId]
  },
  created_at: {
    type: Date,
    required: true
  },
  updated_at: {
    type: Date,
    required: true
  }
});

module.exports = Mongoose.model('activities', activitiesSchema);
