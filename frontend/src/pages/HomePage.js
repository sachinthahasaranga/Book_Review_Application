import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllReviews } from "../services/api";
import ReactStars from "react-rating-stars-component";
import Footer from "../components/Footer";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles
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

    AOS.init({ duration: 1000 }); // Initialize AOS with a 1000ms animation duration
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
      <div id="latest-reviews" className="latest-reviews-container">
        <h2 className="section-title">Latest Reviews</h2>
        <div className="review-list">
          {latestReviews.map((review, index) => (
            <div
              className="review-card-centered"
              key={review._id}
              data-aos="fade-left" // AOS animation
              data-aos-delay={`${index * 100}`}
            >
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
      <Footer />
    </div>
  );
};

export default HomePage;
