const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let offer = new Schema(
  {
    id: {
      type: String,
    },
    url: {
      type: String,
    },
    position: {
      type: String,
    },
    salary: {
      type: String,
    },
    location: {
      type: String,
    },
    company: {
      type: String,
    },
    source: {
      type: String,
    },

    publishedAt: {
      type: String,
    },
  },
  { collection: "Offers" }
);

module.exports = mongoose.model("offer", offer);
