import React, { useState } from "react";
import { addReview } from "../services/api";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = { title, author, review, rating };
    await addReview(newReview);
    alert("Review added successfully!");
    setTitle("");
    setAuthor("");
    setReview("");
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Book Review</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea
        placeholder="Review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        required
        min="0"
        max="5"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookForm;
