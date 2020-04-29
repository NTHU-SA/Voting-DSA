const Mongoose = require('mongoose');
const {Schema} = Mongoose;

const chooseAllSchema = new Schema({
    option_id: {
        type: Mongoose.Types.ObjectId,
        required: true,
    },
    remark: {
        type: String,
        required: true,
    },
}, {
    _id: false,
    strict: 'throw',
});

const votesSchema = new Schema({
    activity_id: {
        type: Mongoose.Types.ObjectId,
        required: true,
    },
    rule: {
        type: String,
        required: true,
    },
    choose_all: {
        type: [chooseAllSchema],
    },
    choose_one: {
        type: Mongoose.Types.ObjectId,
    },
    token: {
        type: String,
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

votesSchema.index({activity_id: 1, option_id: 1});
votesSchema.index({token: 1});

Mongoose.model('votes', votesSchema);
