const Mongoose = require('../libs/database');
const { Schema } = Mongoose;

const candidateSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  avatar_url: {
    type: String,
    required: true
  },
  personal_experiences: {
    type: [String],
    required: true
  },
  political_opinions: {
    type: [String],
    required: true
  }
});

const optionsSchema = new Schema({
  activity_id: {
    type: Mongoose.Types.ObjectId,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  candidate: {
    type: candidateSchema,
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
});

optionsSchema.index({ activity_id: 1 });

module.exports = Mongoose.model('options', optionsSchema);
