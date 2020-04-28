const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const usersSchema = new Schema({
  student_id: {
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
});

usersSchema.index({ student_id: 1 });

module.exports = Mongoose.model('users', usersSchema);
