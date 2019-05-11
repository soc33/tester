const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    tags: [{ type: String }],
    menu_item_id: {
        type: Schema.Types.ObjectId,
        ref: "MenuItem"
    }
});

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
