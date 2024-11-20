import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllReviews, getReviewById } from "../services/api"; // Import API functions
import ReactStars from "react-rating-stars-component"; // For star ratings
import ReviewDetailModal from "../components/ReviewDetailModal"; // Import the modal component
import "../css/AllReviewsPage.css"; // Custom styles
import Footer from "../components/Footer";

const AllReviewsPage = () => {
  const [reviews, setReviews] = useState([]); // All reviews
  const [filteredReviews, setFilteredReviews] = useState([]); // Reviews filtered by search and sort
  const [searchQuery, setSearchQuery] = useState(""); // Search input value
  const [selectedReview, setSelectedReview] = useState(null); // Selected review details
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [sortOrder, setSortOrder] = useState("none"); // Sorting order

  // Fetch all reviews when the component loads
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const allReviews = await getAllReviews();
        setReviews(allReviews);
        setFilteredReviews(allReviews); // Initialize filteredReviews
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = reviews
      .filter(
        (review) =>
          review.title.toLowerCase().includes(query) ||
          review.author.toLowerCase().includes(query)
      )
      .sort((a, b) => sortReviews(a, b, sortOrder)); // Apply sorting during search
    setFilteredReviews(filtered);
  };

  // Handle sorting dropdown change
  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    const sorted = [...filteredReviews].sort((a, b) =>
      sortReviews(a, b, order)
    );
    setFilteredReviews(sorted);
  };

  // Sorting logic
  const sortReviews = (a, b, order) => {
    if (order === "high-to-low") {
      return b.rating - a.rating;
    }
    if (order === "low-to-high") {
      return a.rating - b.rating;
    }
    return 0; // No sorting
  };

  const handleReviewClick = async (id) => {
    try {
      const review = await getReviewById(id);
      setSelectedReview(review);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching review details:", error);
    }
  };

  return (
    <div className="all-reviews-container">
      <Navbar />
      <div className="content-container">
        <h2 className="section-title">All Reviews</h2>

        {/* Search and Sort Controls */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search by book name or author..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="sort-dropdown"
          >
            <option value="none">Sort by Rating</option>
            <option value="high-to-low">High to Low</option>
            <option value="low-to-high">Low to High</option>
          </select>
        </div>

        {/* Reviews List */}
        <div className="reviews-list">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div
                className="review-card-centered"
                key={review._id}
                onClick={() => handleReviewClick(review._id)}
              >
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
            ))
          ) : (
            <p className="no-results">No reviews found. Try a different search.</p>
          )}
        </div>
      </div>

      {/* Modal for Full Review Details */}
      <ReviewDetailModal
        show={showModal}
        onClose={() => setShowModal(false)}
        data={selectedReview}
      />
      <Footer/>
    </div>
  );
};

export default AllReviewsPage;
