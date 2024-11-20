import React from "react";
import ReactStars from "react-rating-stars-component"; // Import ReactStars for star ratings
import "../css/ReviewDetailModal.css";

const ReviewDetailModal = ({ show, onClose, data }) => {
  if (!show) return null;

  return (
    <div className="review-modal-overlay">
      <div className="review-modal-content">
        <h2 className="review-modal-title">{data?.title}</h2>
        <p className="review-modal-author"><strong>Author:</strong> {data?.author}</p>
        <p className="review-modal-text">{data?.review}</p>
        <div className="review-modal-stars">
          <strong>Rating:</strong>
          <ReactStars
            count={5}
            value={data?.rating || 0} // Use the rating from the data, default to 0
            size={24}
            activeColor="#ffd700"
            isHalf={true} // Allow half stars
            edit={false} // Read-only stars
          />
        </div>
        <button className="review-modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ReviewDetailModal;
