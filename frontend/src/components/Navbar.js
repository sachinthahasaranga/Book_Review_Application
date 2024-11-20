import React from "react";
import { HashLink } from "react-router-hash-link";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate("/login");
    };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <HashLink className="navbar-brand" smooth to="/">Book Review App</HashLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <HashLink className="nav-link" smooth to="/all-reviews">All Reviews</HashLink>
            </li>
            <li className="nav-item">
              <HashLink className="nav-link" smooth to="/#latest-reviews">Latest Reviews</HashLink>
            </li>
            <li className="nav-item">
              <HashLink className="nav-link" smooth to="/my-reviews">My Reviews</HashLink>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
