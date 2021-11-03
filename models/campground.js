const mongoose = require("mongoose");
const { campgroundSchema } = require("../ValidateSchema");
const Schema = mongoose.Schema; // just a shortcut
const Review = require("./review");

const ImageSchema = new Schema({
  url: String,
  filename: String,
});
ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };
const CampGroundSchema = new Schema(
  {
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    location: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
);

CampGroundSchema.virtual("properties.popUpMarkup").get(function () {
  return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
                  <p>${this.description.substring(0, 30)}...</p>`;
});

CampGroundSchema.post("findOneAndDelete", async function (data) {
  if (data) {
    await Review.deleteMany({
      _id: {
        $in: data.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampGroundSchema);
