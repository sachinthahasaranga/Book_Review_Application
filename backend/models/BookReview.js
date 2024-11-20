const mongoose = require("mongoose");

const BookReviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BookReview", BookReviewSchema);
