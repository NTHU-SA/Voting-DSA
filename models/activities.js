const Mongoose = require('mongoose');
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
}, {
  strict: 'throw'
});

Mongoose.model('activities', activitiesSchema);