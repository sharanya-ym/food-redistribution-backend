const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const requestRoutes = require("./routes/requestRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000; // ✅ Required by Render
const HOST = "0.0.0.0"; // ✅ Required by Render

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/requests", requestRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected");
    app.listen(PORT, HOST, () => {
      console.log(`🚀 Server running on http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
