import React, { useEffect, useState } from "react";
import { getAllReviews } from "../services/api";

const BookList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getAllReviews();
      setReviews(data);
    };
    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Book Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <h3>{review.title}</h3>
            <p>Author: {review.author}</p>
            <p>Review : {review.review}</p>
            <p>Rating: {review.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
