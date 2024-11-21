import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllReviews, getReviewById } from "../services/api";
import StarRatings from "react-star-ratings"; 
import ReviewDetailModal from "../components/ReviewDetailModal"; 
import "../css/AllReviewsPage.css";

const AllReviewsPage = () => {
  const [reviews, setReviews] = useState([]); 
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const allReviews = await getAllReviews();
        const sortedReviews = [...allReviews].sort((a, b) => sortReviews(a, b, "newest"));
        setReviews(sortedReviews);
        setFilteredReviews(sortedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = reviews
      .filter(
        (review) =>
          review.title.toLowerCase().includes(query) ||
          review.author.toLowerCase().includes(query)
      )
      .sort((a, b) => sortReviews(a, b, sortOrder)); 
    setFilteredReviews(filtered);
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    const sorted = [...filteredReviews].sort((a, b) =>
      sortReviews(a, b, order)
    );
    setFilteredReviews(sorted);
  };

  const sortReviews = (a, b, order) => {
    if (order === "high-to-low") {
      return b.rating - a.rating;
    }
    if (order === "low-to-high") {
      return a.rating - b.rating;
    }
    if (order === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (order === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
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
            <option value="none">Sort</option>
            <option value="high-to-low">High to Low</option>
            <option value="low-to-high">Low to High</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

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
                <p>{review.review.substring(0, 60)}...</p>
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
            ))
          ) : (
            <p className="no-results">No reviews found. Try a different search.</p>
          )}
        </div>
      </div>

      <ReviewDetailModal
        show={showModal}
        onClose={() => setShowModal(false)}
        data={selectedReview}
      />
    </div>
  );
};

export default AllReviewsPage;
