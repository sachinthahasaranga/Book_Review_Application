import React, { useState } from "react";
import StarRatings from "react-star-ratings"; 
import { addReview } from "../services/api";
import Swal from "sweetalert2"; 
import "../css/AddReviewModal.css";

const AddReviewModal = ({ show, onClose, onSave }) => {
  const [newReview, setNewReview] = useState({
    title: "",
    author: "",
    review: "",
    rating: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const userId = JSON.parse(atob(token.split(".")[1])).id;

    try {
      const response = await addReview({ ...newReview, userId });
      const createdReview = response.review;
      onSave(createdReview); 
      setNewReview({ title: "", author: "", review: "", rating: 0 });
      onClose();

      Swal.fire({
        icon: "success",
        title: "Review Added!",
        text: "Your review has been successfully added.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Review",
        text: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Review</h2>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={newReview.title}
            onChange={(e) =>
              setNewReview({ ...newReview, title: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={newReview.author}
            onChange={(e) =>
              setNewReview({ ...newReview, author: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Review</label>
          <textarea
            value={newReview.review}
            onChange={(e) =>
              setNewReview({ ...newReview, review: e.target.value })
            }
          ></textarea>
        </div>
        <div className="form-group">
          <label>Rating</label>
          <StarRatings
            rating={newReview.rating}
            starRatedColor="#ffd700"
            numberOfStars={5}
            starDimension="24px"
            starSpacing="4px"
            changeRating={(newRating) =>
              setNewReview({ ...newReview, rating: newRating })
            }
          />
        </div>
        <div className="modal-buttons">
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
