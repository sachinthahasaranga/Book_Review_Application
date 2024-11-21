import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import AllReviewsPage from "./pages/AllReviewsPage";
import MyReviewsPage from "./pages/MyReviewsPage";
import Footer from "./components/Footer"; // Ensure Footer is included

const App = () => {
  return (
    <div className="app-container">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="main-content">
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
              path="/all-reviews"
              element={
                <PrivateRoute>
                  <AllReviewsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-reviews"
              element={
                <PrivateRoute>
                  <MyReviewsPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
