import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllReviews } from "../services/api";
import ReactStars from "react-rating-stars-component";
import "../css/HomePage.css";

const HomePage = () => {
  const [latestReviews, setLatestReviews] = useState([]);

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const allReviews = await getAllReviews();
        const sortedReviews = allReviews.slice(0, 6);
        setLatestReviews(sortedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchLatestReviews();
  }, []);

  return (
    <div className="homepage-container">
      <Navbar />
      <div className="landing-image-container">
        <img src="/landingImg.jpg" alt="Landing" className="landing-image" />
        <div className="landing-text">
          <h1>Welcome to Book Review App</h1>
          <p>Discover, share, and enjoy your favorite books.</p>
        </div>
      </div>

      {/* Latest Reviews Section */}
      <div className="latest-reviews-container">
        <h2 className="section-title">Latest Reviews</h2>
        <div className="reviews-list">
          {latestReviews.map((review) => (
            <div className="review-card-centered" key={review._id}>
              <h3>{review.title}</h3>
              <p><strong>Author:</strong> {review.author}</p>
              <p>{review.review.substring(0, 100)}...</p> {/* Shortened review */}
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

export default HomePage;
