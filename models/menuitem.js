const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  position: { type: Number, required: true},
  level: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  source: {type: String}
});

const MenuItem = mongoose.model("MenuItem", menuSchema);

module.exports = MenuItem;
