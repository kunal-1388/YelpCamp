const mongoose = require("mongoose");
const Schema = mongoose.Schema; // just a shortcut

const reviewSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  body: String,
  rating: Number,
});

module.exports = mongoose.model("Review", reviewSchema);
