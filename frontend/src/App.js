import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddBookPage from "./pages/AddBookPage";
import BookDetail from "./components/BookDetail";
import PrivateRoute from "./components/PrivateRoute";
import AllReviewsPage from "./pages/AllReviewsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-review"
          element={
            <PrivateRoute>
              <AddBookPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/review/:id"
          element={
            <PrivateRoute>
              <BookDetail />
            </PrivateRoute>
          }
        />
         <Route
          path="/all-reviews"
          element={
            <PrivateRoute>
              <AllReviewsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
