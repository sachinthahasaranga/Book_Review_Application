import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { updateReview } from "../services/api";
import Swal from "sweetalert2";
import "../css/AddReviewModal.css";

const EditReviewModal = ({ show, onClose, reviewData, onSave }) => {
  const [updatedReview, setUpdatedReview] = useState({
    title: "",
    author: "",
    review: "",
    rating: 0,
  });

  useEffect(() => {
    if (reviewData && show) {
      setUpdatedReview({
        title: reviewData.title,
        author: reviewData.author,
        review: reviewData.review,
        rating: reviewData.rating,
        _id: reviewData._id,
      });
    }
  }, [reviewData, show]);

  const handleSave = async () => {
    try {
      const response = await updateReview(updatedReview._id, updatedReview); 
      onSave(response.review); 
      onClose(); 

      
      Swal.fire({
        icon: "success",
        title: "Review Updated!",
        text: "Your review has been successfully updated.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Update Review",
        text: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Review</h2>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={updatedReview.title}
            onChange={(e) =>
              setUpdatedReview({ ...updatedReview, title: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={updatedReview.author}
            onChange={(e) =>
              setUpdatedReview({ ...updatedReview, author: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Review</label>
          <textarea
            value={updatedReview.review}
            onChange={(e) =>
              setUpdatedReview({ ...updatedReview, review: e.target.value })
            }
          ></textarea>
        </div>
        <div className="form-group">
          <label>Rating</label>
          <StarRatings
            rating={updatedReview.rating} 
            starRatedColor="#ffd700"
            numberOfStars={5}
            starDimension="24px"
            starSpacing="4px"
            changeRating={(newRating) =>
              setUpdatedReview({ ...updatedReview, rating: newRating })
            }
          />
        </div>
        <div className="modal-buttons">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;
