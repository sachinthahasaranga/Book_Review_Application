const express = require("express");
const { getReviews, addReview, getReviewsByUser, deleteReview, updateReview, getReviewById } = require("../controllers/bookReviewController");
const router = express.Router();

router.get("/", getReviews);
router.post("/", addReview);
router.get("/reviews/:userId", getReviewsByUser);
router.get("/:id", getReviewById);
router.delete("/:id", deleteReview); 
router.put("/:id", updateReview); 

module.exports = router;
