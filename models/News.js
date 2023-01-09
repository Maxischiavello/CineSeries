const { Schema, model } = require("mongoose");

const newsSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("News", newsSchema);
