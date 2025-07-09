// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const requestRoutes = require("./routes/requestRoutes");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0"; // REQUIRED for Render

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/requests", requestRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Atlas connected");

    // ✅ Start server after DB connection
    app.listen(PORT, HOST, () =>
      console.log(`🚀 Server running at http://${HOST}:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
