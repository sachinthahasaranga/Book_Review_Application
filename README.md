# Book Review Application
Welcome to the Book Review Application! This web application allows users to browse, add, and manage book reviews. It includes features such as star ratings, review filtering and sorting, and secure user authentication.

# Features
 - User Authentication: Secure login and registration system.
 - Review Management: Add, edit, delete, and view reviews.
 - Star Ratings: Display and handle ratings using a 5-star system.
 - Filter and Sort Reviews: Search reviews by title or author and sort by date or rating.
 - Responsive Design: Optimized for desktop and mobile screens.
 - Interactive Alerts: SweetAlert integration for user-friendly notifications.

# Technologies Used
 - Frontend: React, React Router DOM, Star Ratings, Bootstrap, SweetAlert
 - Backend: Node.js, Express
 - Database: MongoDB 
 - Styling: Custom CSS with animations
 - Icons: Font Awesome
 - Tooltips: React Tooltip

# Installation Instructions
 - Prerequisites
 - Node.js and npm installed
 - MongoDB instance running (or a MongoDB Atlas account)
 - Git installed

# Steps

 - Clone the Repository:
   - git clone
   - cd Book_Review_Application

 - Install Dependencies:
   - npm install

 - Set Up the Environment Variables:
   - PORT=5000
   - MONGO_URI=your_mongodb_connection_string
   - JWT_SECRET=your_secret_key

 - Start the Backend Server:
   - npm start

 - Access the Application:
   - Open your browser and navigate to http://localhost:3000


# Usage Instructions
 - User Workflow
   - Register: Sign up for an account.
   - Login: Use your credentials to log in.
   - Browse Reviews: View all reviews, search by book title or author, and sort by date or rating.
   - Manage Your Reviews:
     - Add a new review.
     - Edit or delete your existing reviews.

# Developer Notes
 - SweetAlert is used for interactive alerts and notifications.
 - The app leverages StarRatings for displaying and handling star ratings.
 - Protected routes are implemented using a PrivateRoute component.
 - The Navbar and Footer are included dynamically, with the footer excluded from the login and registration pages.
 - backend is already hosted (https://book-review-application-sigma.vercel.app/api) 