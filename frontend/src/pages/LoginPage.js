import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
        showConfirmButton: false,
        timer: 1500,
      });

      localStorage.setItem("token", response.token);
      navigate("/");
    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid email or password. Please try again.",
      });
      
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center">Welcome Back</h2>
        <p className="text-center">Log in to access your account</p>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="loginbtn w-100">Log In</button>
        </form>
        <div className="text-center mt-3">
          <small>Don't have an account? <a href="/register">Sign up</a></small>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
