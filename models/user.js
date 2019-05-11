const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    email: { type: String, required: true },
    level: { type: Number, required: true, default: 1 },
    created: {type: Date, required: true, default: Date.now()},
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "Resource"
    }],
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: "Resource"
    }],
    clicks: [{
        type: Schema.Types.ObjectId,
        ref: "Resource"
    }]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
