const Mongoose = require('mongoose');
const {Schema} = Mongoose;

const candidateSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    avatar_url: {
        type: String,
        required: true,
    },
    personal_experiences: {
        type: [String],
        required: true,
    },
    political_opinions: {
        type: [String],
        required: true,
    },
}, {
    _id: false,
    strict: 'throw',
});

const optionsSchema = new Schema({
    activity_id: {
        type: Mongoose.Types.ObjectId,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    candidate: {
        type: candidateSchema,
    },
    created_at: {
        type: Date,
        required: true,
    },
    updated_at: {
        type: Date,
        required: true,
    },
}, {
    strict: 'throw',
});

optionsSchema.index({activity_id: 1});
Mongoose.model('options', optionsSchema);
