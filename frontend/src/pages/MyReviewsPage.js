import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getReviewsByUser, deleteReview } from "../services/api";
import StarRatings from "react-star-ratings"; // Replace ReactStars with StarRatings
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import AddReviewModal from "../components/AddReviewModal";
import ReviewDetailModal from "../components/ReviewDetailModal";
import EditReviewModal from "../components/EditReviewModal";
import Swal from "sweetalert2";
import "../css/MyReviewsPage.css";
import Footer from "../components/Footer";

const MyReviewsPage = () => {
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

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

  const handleDelete = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setMyReviews(myReviews.filter((review) => review._id !== reviewId));

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your review has been deleted successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error deleting review:", error);
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete the review. Please try again later.",
      });
    }
  };

  const handleEdit = (review) => {
    setSelectedReview(review);
    setShowEditModal(true);
  };

  const handleSaveReview = (review) => {
    setMyReviews([review, ...myReviews]);
  };

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setShowDetailModal(true);
  };

  const handleSaveEditedReview = (updatedReview) => {
    setMyReviews(
      myReviews.map((review) =>
        review._id === updatedReview._id ? updatedReview : review
      )
    );
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
                onClick={() => handleReviewClick(review)}
              >
                <div className="review-content">
                  <div>
                    <h3>{review.title}</h3>
                    <p>
                      <strong>Author:</strong> {review.author}
                    </p>
                    <p>{review.review.substring(0, 150)}...</p>
                    <div className="stars">
                      <StarRatings
                        rating={review.rating}
                        starRatedColor="#ffd700"
                        numberOfStars={5}
                        starDimension="24px"
                        starSpacing="4px"
                      />
                    </div>
                  </div>
                  <div className="review-actions">
                    <FaEdit
                      className="edit-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(review);
                      }}
                    />
                    <FaTrashAlt
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
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
        <button
          className="floating-create-button"
          onClick={() => setShowAddModal(true)}
          data-tooltip-id="add-review-tooltip"
        >
          <FaPlus />
        </button>
        <Tooltip id="add-review-tooltip" place="top" content="Add new Review" />
      </div>

      <AddReviewModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveReview}
      />

      <EditReviewModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        reviewData={selectedReview}
        onSave={handleSaveEditedReview}
      />

      <ReviewDetailModal
        show={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        data={selectedReview}
      />
      <Footer />
    </div>
  );
};

export default MyReviewsPage;
