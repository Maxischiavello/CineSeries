const { Schema, model } = require("mongoose");

const videoSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  url: {
    type: String,
    required: [true, "URL is required"],
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  series: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Show",
  },
});

module.exports = model("Video", videoSchema);
