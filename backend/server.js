const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// Initialize app
const app = express();

// Middleware
//app.use(cors());
//allow cross origin policy
app.use(cors({
    origin: "https://book-review-application-x5dc.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const bookReviewRoutes = require("./routes/bookReviewRoutes");
app.use("/api/reviews", bookReviewRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running Success!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
