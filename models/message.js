const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    subject: { type: String, required: true },
    path: { type: String },
    content: { type: String },
    replies: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
    contact: {type: Boolean, required: true},
    created: { type: Date, required: true, default: Date.now() },
    archived: {type: Boolean, required: true, default: false}
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
