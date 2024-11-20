import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getReviewsByUser } from "../services/api";
import ReactStars from "react-rating-stars-component";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import AddReviewModal from "../components/AddReviewModal"; 
import ReviewDetailModal from "../components/ReviewDetailModal"; // Import the detail modal
import "../css/MyReviewsPage.css";

const MyReviewsPage = () => {
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false); 
  const [showDetailModal, setShowDetailModal] = useState(false); // Toggle for detail modal
  const [selectedReview, setSelectedReview] = useState(null); // Selected review details

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyReviews = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const userId = JSON.parse(atob(token.split(".")[1])).id;

      try {
        const reviews = await getReviewsByUser(userId);
        setMyReviews(reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyReviews();
  }, []);

  const handleDelete = (reviewId) => {
    console.log("Delete review with ID:", reviewId);
  };

  const handleEdit = (reviewId) => {
    console.log("Edit review with ID:", reviewId);
  };

  const handleSaveReview = (review) => {
    console.log("New review submitted:", review);
    setMyReviews([...myReviews, { ...review, _id: Date.now().toString() }]); // Add to local state
  };

  const handleReviewClick = (review) => {
    setSelectedReview(review); // Set the selected review details
    setShowDetailModal(true); // Open the detail modal
  };

  return (
    <div className="my-reviews-container">
      <Navbar />
      <div className="content-container">
        <h2 className="section-title">My Reviews</h2>
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : myReviews.length > 0 ? (
          <div className="reviews-list">
            {myReviews.map((review) => (
              <div
                className="review-card-centered"
                key={review._id}
                onClick={() => handleReviewClick(review)} // Open modal on click
              >
                <div className="review-content">
                  <div>
                    <h3>{review.title}</h3>
                    <p>
                      <strong>Author:</strong> {review.author}
                    </p>
                    <p>{review.review.substring(0, 150)}...</p>
                    <div className="stars">
                      <ReactStars
                        count={5}
                        value={review.rating}
                        size={24}
                        activeColor="#ffd700"
                        isHalf={true}
                        edit={false}
                      />
                    </div>
                  </div>
                  <div className="review-actions">
                    <FaEdit
                      className="edit-icon"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the modal
                        handleEdit(review._id);
                      }}
                    />
                    <FaTrashAlt
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the modal
                        handleDelete(review._id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews found for this user.</p>
        )}
        {/* Floating Button with Tooltip */}
        <button
          className="floating-create-button"
          onClick={() => setShowAddModal(true)}
          data-tooltip-id="add-review-tooltip"
        >
          <FaPlus />
        </button>
        <Tooltip id="add-review-tooltip" place="top" content="Add new Review" />
      </div>

      {/* Add Review Modal */}
      <AddReviewModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveReview}
      />

      {/* Review Detail Modal */}
      <ReviewDetailModal
        show={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        data={selectedReview} // Pass the selected review data
      />
    </div>
  );
};

export default MyReviewsPage;
