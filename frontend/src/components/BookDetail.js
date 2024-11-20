import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewById } from "../services/api";

const BookDetail = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      const data = await getReviewById(id);
      setReview(data);
    };
    fetchReview();
  }, [id]);

  if (!review) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{review.title}</h2>
      <p>Author: {review.author}</p>
      <p>Review: {review.review}</p>
      <p>Rating: {review.rating}</p>
    </div>
  );
};

export default BookDetail;
