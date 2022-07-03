const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    image_text: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
    width: {
      required: true,
      type: Number,
    },
    height: {
      required: true,
      type: Number,
    },
  },
  { collection: "image_data" }
);

module.exports = mongoose.model("Data", dataSchema);
