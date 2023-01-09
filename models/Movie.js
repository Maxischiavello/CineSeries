const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"],
  },
  synopsis: {
    type: String,
    required: [true, "Synopsis is required"],
  },
  cast: {
    type: String,
    required: [true, "Cast is required"],
  },
});

module.exports = model("Movie", movieSchema);
