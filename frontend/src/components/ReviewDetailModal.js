import React from "react";
import StarRatings from "react-star-ratings";
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
          <StarRatings
            rating={data?.rating || 0} 
            starRatedColor="#ffd700"
            numberOfStars={5}
            starDimension="24px"
            starSpacing="4px"
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
