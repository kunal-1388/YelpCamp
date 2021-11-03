const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/yelp-camp");
  console.log("Mongoose connected!!");
}

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 50);
    const camp = new Campground({
      author: "61781505961694788b03024c",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dhwt2p49b/image/upload/v1635401935/YelpCamp/q2ztqqigsdnea5rkfols.jpg",
          filename: "YelpCamp/q2ztqqigsdnea5rkfols",
        },

        {
          url: "https://res.cloudinary.com/dhwt2p49b/image/upload/v1635401943/YelpCamp/u8w0qypfmhlpop0dpm75.jpg",
          filename: "YelpCamp/u8w0qypfmhlpop0dpm75",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum doloribus, nobis animi laudantium ea, harum aliquam eius fugiat ipsam libero laboriosam distinctio provident? Doloremque eum dignissimos veritatis nihil! Quod, est.",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
