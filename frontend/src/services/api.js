import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Update with your backend URL

// Fetch all reviews
export const getAllReviews = async () => {
  const response = await axios.get(`${API_BASE_URL}/reviews`);
  return response.data;
};

// Get review by ID
export const getReviewById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/reviews/${id}`);
  return response.data;
};

// Add a new review
export const addReview = async (review) => {
  const response = await axios.post(`${API_BASE_URL}/reviews`, review);
  return response.data;
};

// Update review by ID
export const updateReview = async (id, updatedReview) => {
  const response = await axios.put(`${API_BASE_URL}/reviews/${id}`, updatedReview);
  return response.data;
};

// Delete review by ID
export const deleteReview = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/reviews/${id}`);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
  return response.data;
};

// Login a user
export const loginUser = async (loginData) => {
  const response = await axios.post(`${API_BASE_URL}/users/login`, loginData);
  return response.data;
};
