import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllReviews } from "../services/api";
import ReactStars from "react-rating-stars-component"; // For star ratings
import "../css/AllReviewsPage.css"; // Custom styles

const AllReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const allReviews = await getAllReviews();
        setReviews(allReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="all-reviews-container">
      <Navbar />
      <div className="content-container">
        <h2 className="section-title">All Reviews</h2>
        <div className="reviews-list">
          {reviews.map((review) => (
            <div className="review-card-centered" key={review._id}>
              <h3>{review.title}</h3>
              <p><strong>Author:</strong> {review.author}</p>
              <p>{review.review.substring(0, 150)}...</p> {/* Shortened review */}
              <div className="stars">
                <ReactStars
                  count={5}
                  value={review.rating}
                  size={24}
                  activeColor="#ffd700"
                  isHalf={true} // Allow half stars
                  edit={false} // Read-only stars
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllReviewsPage;
