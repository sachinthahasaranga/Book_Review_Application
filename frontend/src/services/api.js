import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";
// const API_BASE_URL = "https://book-review-application-euu3.vercel.app/api";


// Fetch all reviews
export const getAllReviews = async () => {
  const response = await axios.get(`${API_BASE_URL}/reviews`);
  return response.data;
};

// Get review by ID
export const getReviewById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reviews/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching review by ID:", error);
    throw error;
  }
};

//add new review
export const addReview = async (reviewData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

// Update review by ID
export const updateReview = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/reviews/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

// Delete review by ID
export const deleteReview = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/reviews/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};


export const getReviewsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reviews/reviews/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    throw error;
  }
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
