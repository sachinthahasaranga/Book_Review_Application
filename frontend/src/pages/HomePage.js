import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllReviews } from "../services/api";
import StarRatings from "react-star-ratings";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
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

    AOS.init({ duration: 1000 });
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
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <h3>{review.title}</h3>
              <p><strong>Author:</strong> {review.author}</p>
              <p>{review.review.substring(0, 100)}...</p>
              <div className="stars">
                <StarRatings
                  rating={review.rating} 
                  starRatedColor="#ffd700" 
                  numberOfStars={5} 
                  starDimension="24px" 
                  starSpacing="4px" 
                  name="rating"
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
