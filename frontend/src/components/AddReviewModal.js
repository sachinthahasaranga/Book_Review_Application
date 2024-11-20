import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { addReview } from "../services/api";
import "../css/AddReviewModal.css";

const AddReviewModal = ({ show, onClose, onSave }) => {
  const [newReview, setNewReview] = useState({
    title: "",
    author: "",
    review: "",
    rating: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    const userId = JSON.parse(atob(token.split(".")[1])).id; // Decode user ID from token

    try {
        const response = await addReview({ ...newReview, userId }); // Use the function
        onSave(response.review); // Pass the saved review back to the parent
        setNewReview({ title: "", author: "", review: "", rating: 0 }); // Reset form
        onClose(); // Close the modal
      } catch (err) {
        setError(err.response?.data?.message || "Failed to add review");
      } finally {
        setLoading(false);
      }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Review</h2>
        {error && <p className="error-text">{error}</p>}
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
          <ReactStars
            count={5}
            value={newReview.rating}
            size={24}
            activeColor="#ffd700"
            isHalf={true}
            onChange={(newRating) =>
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
