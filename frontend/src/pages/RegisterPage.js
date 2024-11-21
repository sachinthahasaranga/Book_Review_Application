import React, { useState } from "react";
import { registerUser } from "../services/api";
import Swal from "sweetalert2"; // Import SweetAlert
import "../css/RegisterPage.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ name, email, password });
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You can now log in.",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Please try again.",
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="text-center">Join Us</h2>
        <p className="text-center">Create an account to get started</p>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="registerbtn w-100">Register</button>
        </form>
        <div className="text-center mt-3">
          <small>Already have an account? <a href="/login">Log in</a></small>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
