const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const activitiesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    rule: {
        type: String,
        required: true,
    },
    users: {
        type: [Mongoose.Types.ObjectId],
    },
    options: {
        type: [Mongoose.Types.ObjectId],
    },
    open_from: {
        type: Date,
        required: true,
    },
    open_to: {
        type: Date,
        required: true,
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

Mongoose.model('activities', activitiesSchema);
