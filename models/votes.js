const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const votesSchema = new Schema({
  activity_id: {
    type: Mongoose.Types.ObjectId,
    required: true
  },
  option_id: {
    type: Mongoose.Types.ObjectId,
    required: true
  },
  token: {
    type: String,
    required: true
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

votesSchema.index({ activity_id: 1, option_id: 1 });
votesSchema.index({ token: 1 });

Mongoose.model('votes', votesSchema);
