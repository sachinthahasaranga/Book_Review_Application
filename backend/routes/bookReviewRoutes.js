const express = require("express");
const { getReviews, addReview } = require("../controllers/bookReviewController");
const router = express.Router();

router.get("/", getReviews);
router.post("/", addReview);
router.get("/reviews/:userId", getReviewsByUser);

module.exports = router;
