const BookReview = require("../models/BookReview");

// Get all reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await BookReview.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const reviews = await BookReview.find({ userId }).populate("userId", "name email");
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Add a new review
const addReview = async (req, res) => {
    const { title, author, review, rating, userId } = req.body;
    try {
      // Ensure the userId is provided
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const newReview = new BookReview({ title, author, review, rating, userId });
      await newReview.save();
  
      res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


module.exports = { getReviews, addReview };
