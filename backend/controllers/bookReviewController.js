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
    const reviews = await Review.find({ userId }); // Fetch reviews by userId
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({ message: "Error fetching reviews." });
  }
};

const getReviewById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const review = await BookReview.findById(id);
  
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
  
      res.status(200).json(review);
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

  // Delete a review
const deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
      const review = await BookReview.findByIdAndDelete(id);
  
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
  
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateReview = async (req, res) => {
    const { id } = req.params;
    const { title, author, review, rating } = req.body;
  
    try {
      const updatedReview = await BookReview.findByIdAndUpdate(
        id,
        { title, author, review, rating },
        { new: true, runValidators: true }
      );
  
      if (!updatedReview) {
        return res.status(404).json({ message: "Review not found" });
      }
  
      res.status(200).json({ message: "Review updated successfully", review: updatedReview });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = { getReviews, addReview, getReviewsByUser, deleteReview, updateReview, getReviewById };
