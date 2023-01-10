const { Schema, model } = require("mongoose");

const showSchema = new Schema({
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
  synopsis: {
    type: String,
    required: [true, "Synopsis is required"],
  },
  cast: {
    type: String,
    required: [true, "Cast is required"],
  },
});

module.exports = model("Show", showSchema);
